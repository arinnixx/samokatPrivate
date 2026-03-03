import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class CouriersAggregatorService extends BaseService<CouriersAggregator> {
    name = 'couriers-aggregator';

    constructor(
        @InjectRepository(CouriersAggregator) repo: Repository<CouriersAggregator>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    async createItem(data: DeepPartial<CouriersAggregator>, aggregator: Aggregator, {
        repo,
        manager,
    }: Repositories<CouriersAggregator> = {}): Promise<CouriersAggregator> {
        const item = await super.createItem(data, aggregator, {
            repo,
            manager,
        });

        await this.rmqService.publish({
            id: item.id,
            name: this.name,
            method: 'POST',
            data: {
                couriers_id: item.couriers.id,
                aggregator: { id: aggregator.id },
                start_date: item.start_date,
                end_date: item.end_date,
            },
        });
        return item;
    }
}
