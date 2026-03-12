import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { DeliveryBags } from '../entities/DeliveryBags';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {Aggregator} from "../entities/Aggregator";
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {TokenService} from "../token/token.service";
import {ViolationsType} from "../entities/ViolationType";

@Injectable()
export class DeliveryBagsService extends BaseService<DeliveryBags> {
    name = 'delivery-bags';

    constructor(
        @InjectRepository(DeliveryBags) repo: Repository<DeliveryBags>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    async createItem(data: Partial<DeliveryBags>, aggregator: Aggregator): Promise<DeliveryBags> {
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

