import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { DriverLicense } from '../entities/DriverLicense';

@Injectable()
export class DriverLicenseService extends BaseService<DriverLicense> {
    name = 'driver-license';

    constructor(
        @InjectRepository(DriverLicense) repo: Repository<DriverLicense>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<DriverLicense>
    }) {
        return super.rebuildAggregator({ data });
    }
}
