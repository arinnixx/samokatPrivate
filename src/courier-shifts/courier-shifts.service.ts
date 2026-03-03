import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CourierShift } from '../entities/CourierShifts';

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

    async get() {
        return await this.repo.find();
    }
}
