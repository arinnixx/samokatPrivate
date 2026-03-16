import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Aggregator } from '../entities/Aggregator';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AggregatorService extends BasePrivateService<Aggregator> {
    name = 'aggregator';

    constructor(
        @InjectRepository(Aggregator) repo: Repository<Aggregator>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
        private tokenService: TokenService,
    ) {
        super(repo, dataSource, rmqService);
    }

    /**
     * Валидация агрегатора по логину и паролю
     */
    async validateAggregator(login: string, password: string): Promise<Aggregator | null> {
        const aggregator = await this.repo.findOne({ where: { login } });

        if (!aggregator) {
            return null;
        }

        const isValid = await bcrypt.compare(password, aggregator.password);

        return isValid ? aggregator : null;
    }

    /**
     * Логин агрегатора
     */
    async loginAggregator(login: string, password: string): Promise<{ aggregator: Aggregator; token: string }> {
        const aggregator = await this.validateAggregator(login, password);

        if (!aggregator) {
            throw new UnauthorizedException('Неверный логин или пароль');
        }

        const token = this.tokenService.generateToken();

        await this.updateAggregatorToken(aggregator.id, token);

        const updatedAggregator = await this.repo.findOne({
            where: { id: aggregator.id }
        });

        return {
            aggregator: updatedAggregator,
            token
        };
    }

    /**
     * Выход агрегатора (очистка токена)
     */
    async logoutAggregator(aggregatorId: number): Promise<void> {
        await this.repo.update(aggregatorId, { token: null });
    }

    /**
     * Создание нового агрегатора с логином и паролем
     */
    async createAggregatorWithCredentials(data: {
        name: string;
        login: string;
        password: string;
    }): Promise<number> {
        const existAggregator = await this.repo.findOne({ where: { login: data.login } });

        if (existAggregator) {
            throw new BadRequestException('Агрегатор с таким логином уже существует');
        }

        const passwordSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, passwordSalt);

        const token = this.tokenService.generateToken();
        const lookupKey = this.tokenService.generateLookupKey(token);
        const { hash, salt: tokenSalt } = await this.tokenService.hashToken(token);

        const aggregator = this.repo.create({
            name: data.name,
            login: data.login,
            password: hashedPassword,
            salt: tokenSalt,
            lookupKey,
            tokenHash: hash,
            token
        });

        await this.repo.save(aggregator);

        await this.rmqService.publish({
            id: aggregator.id,
            name: this.name,
            method: 'POST',
            data: { ...aggregator },
        });

        return aggregator.id;
    }

    /**
     * Обновление токена агрегатора
     */
    async updateAggregatorToken(aggregatorId: number, newToken: string): Promise<void> {
        const aggregator = await this.repo.findOne({
            where: { id: aggregatorId },
        });

        if (!aggregator) {
            throw new Error('Агрегатор не найден!');
        }

        const lookupKey = this.tokenService.generateLookupKey(newToken);
        const { hash, salt } = await this.tokenService.hashToken(newToken);

        await this.repo.update(aggregatorId, {
            lookupKey,
            tokenHash: hash,
            salt,
            token: newToken
        });
    }

    /**
     * Создаем нового агрегатора
     */
    async createItem({ name, login, password }: DeepPartial<Aggregator>, isSendRmq = false): Promise<number> {
        if (login && password) {
            return this.createAggregatorWithCredentials({
                name: name as string,
                login: login as string,
                password: password as string
            });
        }

        const token = this.tokenService.generateToken();
        const lookupKey = this.tokenService.generateLookupKey(token);
        const { hash, salt } = await this.tokenService.hashToken(token);

        const aggregator = this.repo.create({
            name,
            lookupKey,
            tokenHash: hash,
            salt,
            token
        });

        await this.repo.save(aggregator);

        if (isSendRmq) {
            await this.rmqService.publish({
                id: aggregator.id,
                name: this.name,
                method: 'POST',
                data: { ...aggregator },
            });
        }

        return aggregator.id;
    }

    /**
     * Удаление агрегатора
     */
    async deleteAggregator(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}