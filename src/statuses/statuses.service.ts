import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository, DataSource, DeepPartial} from 'typeorm';
import { BasePrivateService } from '../base/base-private.service';
import { Statuses } from '../entities/Statuses';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import {StatusesHistory} from "../entities/StatusesHistory";

@Injectable()
export class StatusesService extends BasePrivateService<Statuses> {
    name = 'statuses';

    constructor(
        @InjectRepository(Statuses) repo: Repository<Statuses>,
        @InjectRepository(StatusesHistory) private historyRepo: Repository<StatusesHistory>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }

    async createItem(data: any, isSendRmq = false): Promise<number> {
        const transformedData = { ...data };
        if (transformedData.name && !transformedData.status_name) {
            transformedData.status_name = transformedData.name;
            delete transformedData.name;
        }
        return super.createItem(transformedData, isSendRmq);
    }

    async updateBy(where: any, data: DeepPartial<Statuses>, isSendRmq = false): Promise<boolean> {
        const existing = await this.findOneBy(where);
        if (!existing) {
            throw new Error('Status not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                statusId: existing.id,
                data: existing,
                action: 'UPDATE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            await queryRunner.manager.update(Statuses, existing.id, data);

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
                statusId: existing.id,
                data: existing,
                action: 'DELETE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            const now = Math.floor(Date.now() / 1000);
            await queryRunner.manager.update(Statuses, id, { deleted_at: now });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async getHistory(statusId: number): Promise<StatusesHistory[]> {
        return this.historyRepo.find({
            where: { statusId },
            order: { changedAt: 'DESC' }
        });
    }


}