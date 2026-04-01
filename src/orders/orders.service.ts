import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Order } from '../entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import {CourierShift} from "../entities/CourierShifts";
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {OrderHistory} from "../entities/OrderHistory";
import {getMoscowUnixTime, safeGetUnixTime} from "../utils/date";
import {CreateOrderDto} from "./dto/create-order.dto";

@Injectable()
export class OrdersService extends BaseService<Order> {
    name = 'orders';

    constructor(
        @InjectRepository(Order) repo: Repository<Order>,
        @InjectRepository(OrderHistory) private historyRepo: Repository<OrderHistory>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<CourierShift>
    }) {
        return super.rebuildAggregator({ data });
    }

    async createItem(data: CreateOrderDto, aggregator: Aggregator): Promise<Order> {
        const startTimestamp = getMoscowUnixTime(data.start_date);
        const endTimestamp = data.end_date ? getMoscowUnixTime(data.end_date) : null;

        const orderData = {
            ...data,
            start_date: startTimestamp,
            end_date: endTimestamp,
            aggregator: aggregator,
        };

        const item = this.repo.create(orderData);
        const savedItem = await this.repo.save(item);

        await this.rmqService.publish({
            name: this.name,
            method: 'POST',
            data: savedItem,
        });

        return savedItem;
    }

    async updateBy(where: any, data: DeepPartial<Order>, aggregator: Aggregator, checkField = null): Promise<boolean> {
        const existing = await this.findOneBy(where);
        if (!existing) {
            throw new Error('Order not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                orderId: existing.id,
                data: existing,
                action: 'UPDATE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            await queryRunner.manager.update(Order, existing.id, data);

            await queryRunner.commitTransaction();
            return true;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: number, aggregator: Aggregator): Promise<void> {
        const existing = await this.findOneBy({ id });
        if (!existing) return;

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                orderId: existing.id,
                data: existing,
                action: 'DELETE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            const now = Math.floor(Date.now() / 1000);
            await queryRunner.manager.update(Order, id, { deleted_at: now });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async getHistory(orderId: number): Promise<OrderHistory[]> {
        return this.historyRepo.find({
            where: { orderId },
            order: { changedAt: 'DESC' }
        });
    }
}
