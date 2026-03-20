import { Injectable } from '@nestjs/common';
import { TransportType } from '../entities/TransportTypes';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource, DeepPartial, Repository} from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';
import {TransportTypeHistory} from "../entities/TransportTypeHistory";

@Injectable()

export class TransportTypesService extends BasePrivateService<TransportType> {
    name = 'transport-types';

    constructor(
        @InjectRepository(TransportType) repo: Repository<TransportType>,
        @InjectRepository(TransportTypeHistory) private historyRepo: Repository<TransportTypeHistory>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }

    async updateBy(where: any, data: DeepPartial<TransportType>, isSendRmq = false): Promise<boolean> {
        const existing = await this.findOneBy(where);
        if (!existing) {
            throw new Error('Transport type not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                transportTypeId: existing.id,
                data: existing,
                action: 'UPDATE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            await queryRunner.manager.update(TransportType, existing.id, data);

            await queryRunner.commitTransaction();
            return true;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: number, isSendRmq = false): Promise<void> {
        const existing = await this.findOneBy({ id });
        if (!existing) return;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                transportTypeId: existing.id,
                data: existing,
                action: 'DELETE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            const now = Math.floor(Date.now() / 1000);
            await queryRunner.manager.update(TransportType, id, { deleted_at: now });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async getHistory(transportTypeId: number): Promise<TransportTypeHistory[]> {
        return this.historyRepo.find({
            where: { transportTypeId },
            order: { changedAt: 'DESC' }
        });
    }
}
