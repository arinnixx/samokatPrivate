import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Couriers } from '../entities/Couriers';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
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

    async createItem( data: DeepPartial<DriverLicense>,aggregator: Aggregator, {
        repo,
        manager,
    }: Repositories<DriverLicense> = {}): Promise<DriverLicense> {
            const item = await super.createItem( data,aggregator, {
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
