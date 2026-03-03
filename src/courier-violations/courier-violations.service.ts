import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CourierViolations } from '../entities/CourierViolations';

@Injectable()
export class CourierViolationsService extends BaseService<CourierViolations> {
    name = 'courier-violations';

    constructor(
        @InjectRepository(CourierViolations) repo: Repository<CourierViolations>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<CourierViolations>
    }) {
        return super.rebuildAggregator({ data });
    }

    // async createItem(data: DeepPartial<CourierViolations>, aggregator: Aggregator, {
    //     repo,
    //     manager,
    // }: Repositories<CourierViolations> = {}): Promise<CourierViolations> {
    //     const item = await super.createItem(data, aggregator, {
    //         repo,
    //         manager,
    //     });
    //     await this.rmqService.publish({
    //         id: item.id,
    //         name: this.name,
    //         method: 'POST',
    //         data: item,
    //     });
    //     return item;
    // }

}
