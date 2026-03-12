import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Transport } from '../entities/Transport';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {Aggregator} from "../entities/Aggregator";

@Injectable()
export class TransportService extends BaseService<Transport> {
    name = 'transport';

    constructor(
        @InjectRepository(Transport) repo: Repository<Transport>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    async createItem(data: Partial<Transport>, aggregator: Aggregator): Promise<Transport> {
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
