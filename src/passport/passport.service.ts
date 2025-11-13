import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { Passport } from '../entities/Passport';

@Injectable()
export class PassportService extends BaseService<Passport> {
    name = 'passport';

    constructor(
        @InjectRepository(Passport) repo: Repository<Passport>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<Passport>
    }) {
        return super.rebuildAggregator({ data });
    }

    async createItem( data: DeepPartial<Passport>,aggregator: Aggregator, {
        repo,
        manager,
    }: Repositories<Passport> = {}): Promise<Passport> {
        const item = await super.createItem( data, aggregator,{
            repo,
            manager,
        });
        await this.rmqService.publish({
            id: item.id,
            name: this.name,
            method: 'POST',
            data: item,
        });
        return item;
    }
}
