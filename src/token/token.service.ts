import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Aggregator } from '../entities/Aggregator';
import { Admin } from '../entities/Admin';
import * as uuid from 'uuid';

@Injectable()
export class TokenService {
    private readonly HMAC_SECRET = process.env.HMAC_SECRET || 'your-secret-key';
    private readonly LOOKUP_PREFIX_LENGTH = 12;
    private readonly SALT_ROUNDS = 10;

    constructor(
        @InjectRepository(Aggregator)
        private readonly aggregatorRepository: Repository<Aggregator>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) {
    }

    generateToken() {
        return `${uuid.v4().replaceAll('-', '')}`;
    }

    /**
     * Генерируем lookup ключ (первые N символов HMAC)
     */
    generateLookupKey(token: string): string {
        const hmac = crypto.createHmac('sha256', this.HMAC_SECRET);
        hmac.update(token);
        const fullHash = hmac.digest('hex');
        return fullHash.substring(0, this.LOOKUP_PREFIX_LENGTH);
    }

    /**
     * Хэшируем токен для хранения
     */
    async hashToken(token: string): Promise<{ hash: string; salt: string }> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        const hash = await bcrypt.hash(token, salt);
        return { hash, salt };
    }

    /**
     * Проверка токена (оптимизированная версия)
     */
    async verifyToken(token: string): Promise<Aggregator | null> {
        const lookupKey = this.generateLookupKey(token);

        const aggregator = await this.aggregatorRepository.findOne({
            where: {
                lookupKey,
            },
        });

        if (!aggregator) {
            return null;
        }
        const isValid = await bcrypt.compare(token, aggregator.tokenHash);

        if (isValid) {
            return aggregator;
        }

        return null;
    }

    /**
     * Проверка токена (оптимизированная версия)
     */
    async verifyTokenAdmin(token: string): Promise<Admin | null> {
        const lookupKey = this.generateLookupKey(token);

        const admin = await this.adminRepository.findOne({
            where: {
                lookupKey,
            },
        });

        if (!admin) {
            return null;
        }

        const isValid = await bcrypt.compare(token, admin.tokenHash);

        if (isValid) {
            return admin;
        }

        return null;
    }

    /**
     * Обновление токена
     */
    async updateToken(aggregatorId: number, newToken: string): Promise<void> {
        const aggregator = await this.aggregatorRepository.findOne({
            where: { id: aggregatorId },
        });

        if (!aggregator) {
            throw new Error('Aggregator not found');
        }

        const lookupKey = this.generateLookupKey(newToken);
        const { hash, salt } = await this.hashToken(newToken);

        await this.aggregatorRepository.update(aggregator.id, {
            lookupKey,
            tokenHash: hash,
            salt,
        });
    }

}