import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ViolationsType } from '../entities/ViolationType';

@Injectable()
export class ViolationsTypeService extends BaseService<ViolationsType> {
    name = 'violations-type';

    constructor(
        @InjectRepository(ViolationsType) repo: Repository<ViolationsType>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<ViolationsType>
    }) {
        return super.rebuildAggregator({ data });
    }

    async createItem(data: DeepPartial<ViolationsType>, aggregator: Aggregator, {
        repo,
        manager,
    }: Repositories<ViolationsType> = {}): Promise<ViolationsType> {
        const item = await super.createItem(data, aggregator, {
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
