import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { Admin } from '../entities/Admin';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';
import * as bcrypt from 'bcrypt';
import {TokenService} from "../token/token.service";

@Injectable()
export class AdminService extends BasePrivateService<Admin> {
    name = 'admin';

    constructor(
        @InjectRepository(Admin) repo: Repository<Admin>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
        private tokenService: TokenService,
    ) {
        super(repo, dataSource, rmqService);
    }

    /**
     * Валидация админа по логину и паролю
     */
    async validateAdmin(login: string, password: string): Promise<Admin | null> {
        const admin = await this.repo.findOne({ where: { login } });

        if (!admin) {
            return null;
        }

        const isValid = await bcrypt.compare(password, admin.password);

        return isValid ? admin : null;
    }

    /**
     * Логин админа
     */
    async loginAdmin(login: string, password: string): Promise<{ admin: Admin; token: string }> {
        const admin = await this.validateAdmin(login, password);

        if (!admin) {
            throw new UnauthorizedException('Неверный логин или пароль');
        }

        // Генерация нового токена
        const token = this.tokenService.generateToken();

        // Обновление токена в базе данных
        await this.updateAdminToken(admin.id, token);

        // Получаем обновленного агрегатора с токеном
        const updatedAdmin = await this.repo.findOne({
            where: { id: admin.id }
        });

        return {
            admin: updatedAdmin,
            token
        };
    }

    /**
     * Выход алмина (очистка токена)
     */
    async logoutAdmin(adminId: number): Promise<void> {
        await this.repo.update(adminId, { token: null });
    }

    /**
     * Создание нового админ с логином и паролем
     */
    async createAdminWithCredentials(data: {
        login: string;
        password: string;
    }): Promise<number> {
        const existAdmin = await this.repo.findOne({ where: { login: data.login } });

        if (existAdmin) {
            throw new BadRequestException('Админ с таким логином уже существует');
        }

        // Хешируем пароль
        const passwordSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(data.password, passwordSalt);

        // Генерируем токен
        const token = this.tokenService.generateToken();
        const lookupKey = this.tokenService.generateLookupKey(token);
        const { hash, salt: tokenSalt } = await this.tokenService.hashToken(token);

        // Создаем агрегатора
        const admin = this.repo.create({
            login: data.login,
            password: hashedPassword,
            salt: tokenSalt, // Используем tokenSalt для токена
            lookupKey,
            tokenHash: hash,
            token
        });

        await this.repo.save(admin);

        // Отправляем в RabbitMQ
        await this.rmqService.publish({
            id: admin.id,
            name: this.name,
            method: 'POST',
            data: { ...admin },
        });

        return admin.id;
    }

    /**
     * Обновление токена админа
     */
    async updateAdminToken(adminId: number, newToken: string): Promise<void> {
        const admin = await this.repo.findOne({
            where: { id: adminId },
        });

        if (!admin) {
            throw new Error('Админ не найден!');
        }

        const lookupKey = this.tokenService.generateLookupKey(newToken);
        const { hash, salt } = await this.tokenService.hashToken(newToken);

        await this.repo.update(adminId, {
            lookupKey,
            tokenHash: hash,
            salt,
            token: newToken
        });
    }

    /**
     * Создаем нового админа
     */
    async createItem({login, password }: DeepPartial<Admin>, isSendRmq = false): Promise<number> {
        if (login && password) {
            // Если переданы логин и пароль, используем новый метод
            return this.createAdminWithCredentials({
                login: login as string,
                password: password as string
            });
        }

        const token = this.tokenService.generateToken();
        const lookupKey = this.tokenService.generateLookupKey(token);
        const { hash, salt } = await this.tokenService.hashToken(token);

        const admin = this.repo.create({
            lookupKey,
            tokenHash: hash,
            salt,
            token
        });

        await this.repo.save(admin);

        if (isSendRmq) {
            await this.rmqService.publish({
                id:admin.id,
                name: this.name,
                method: 'POST',
                data: { ...admin },
            });
        }

        return admin.id;
    }

    /**
     * Удаление админа
     */
    async deleteAdmin(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}