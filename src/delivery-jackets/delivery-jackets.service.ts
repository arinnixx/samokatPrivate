import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryJackets } from '../entities/DeliveryJackets';
import { DataSource, Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import {CourierViolations} from "../entities/CourierViolations";
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {DeliveryBags} from "../entities/DeliveryBags";
import {Aggregator} from "../entities/Aggregator";

@Injectable()
export class DeliveryJacketsService extends BaseService<DeliveryJackets> {
    name = 'delivery-jackets';

    constructor(
        @InjectRepository(DeliveryJackets) repo: Repository<DeliveryJackets>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    async createItem(data: Partial<DeliveryJackets>, aggregator: Aggregator): Promise<DeliveryJackets> {
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
