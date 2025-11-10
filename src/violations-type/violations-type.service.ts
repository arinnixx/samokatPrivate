import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Couriers } from '../entities/Couriers';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';

@Injectable()
export class ViolationsTypeService extends BaseService<Couriers> {
    name = 'violations-type';

    constructor(
        @InjectRepository(Couriers) repo: Repository<Couriers>,
        dataSource: DataSource,
        private employeeAggregatorService: CouriersAggregatorService,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<Couriers>
    }) {
        return super.rebuildAggregator({ data });
    }

    async createItem(aggregator: Aggregator, data: DeepPartial<Couriers> & { personal_number: string }, {
        repo,
        manager,
    }: Repositories<Couriers> = {}): Promise<Couriers> {
        let item = await this.findOneBy({ snils: data.snils });
        if (!item) {
            item = await super.createItem(aggregator, data, {
                repo,
                manager,
            });
        }
        await this.rmqService.publish({
            id: item.id,
            name: this.name,
            method: 'POST',
            data: item,
        });
        await this.employeeAggregatorService.createItem(aggregator, { employee: item, personnel_number: data.personal_number });
        return item;
    }

}
