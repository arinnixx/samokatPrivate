import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Order } from '../entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import {CourierShift} from "../entities/CourierShifts";
import {CourierViolations} from "../entities/CourierViolations";
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {OrdersController} from "./orders.controller";
import {safeGetUnixTime} from "../utils/date";

@Injectable()
export class OrdersService extends BaseService<Order> {
    name = 'orders';

    constructor(
        @InjectRepository(Order) repo: Repository<Order>,
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

    async createItem(data: Partial<Order>, aggregator: Aggregator): Promise<Order> {
        const item = this.repo.create({
            ...data,
            aggregator: aggregator,
        });

        const savedItem = await this.repo.save(item);

        await this.rmqService.publish({
            name: this.name,
            method: 'POST',
            data: savedItem,
        });

        return savedItem;

    }
}
