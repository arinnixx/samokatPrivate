import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {DataSource, DeepPartial, Repository} from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ViolationsType } from '../entities/ViolationType';
import { BasePrivateService } from '../base/base-private.service';
import {Aggregator} from "../entities/Aggregator";
import {Order} from "../entities/Orders";
import {OrderHistory} from "../entities/OrderHistory";
import {ViolationsTypeHistory} from "../entities/ViolationTypeHistory";

@Injectable()
export class ViolationsTypeService extends BasePrivateService<ViolationsType> {
    name = 'violations-type';

    constructor(
        @InjectRepository(ViolationsType) repo: Repository<ViolationsType>,
        @InjectRepository(ViolationsTypeHistory) private historyRepo: Repository<ViolationsTypeHistory>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }

    async updateBy(where: any, data: DeepPartial<ViolationsType>, isSendRmq = false): Promise<boolean> {
        const existing = await this.findOneBy(where);
        if (!existing) {
            throw new Error('Violation type not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                violationTypeId: existing.id,
                data: existing,
                action: 'UPDATE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            await queryRunner.manager.update(ViolationsType, existing.id, data);

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
                violationTypeId: existing.id,
                data: existing,
                action: 'DELETE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            const now = Math.floor(Date.now() / 1000);
            await queryRunner.manager.update(ViolationsType, id, { deleted_at: now });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async getHistory(violationTypeId: number): Promise<ViolationsTypeHistory[]> {
        return this.historyRepo.find({
            where: { violationTypeId },
            order: { changedAt: 'DESC' }
        });
    }
}
