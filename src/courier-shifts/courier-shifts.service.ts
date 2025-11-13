import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CourierShift } from '../entities/CourierShifts';
import { Passport } from '../entities/Passport';

@Injectable()
export class CourierShiftsService extends BaseService<CourierShift> {
    name = 'courier-shifts';

    constructor(
        @InjectRepository(CourierShift) repo: Repository<CourierShift>,
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

    async createItem( data: DeepPartial<CourierShift>,aggregator: Aggregator, {
        repo,
        manager,
    }: Repositories<CourierShift> = {}): Promise<CourierShift> {
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
