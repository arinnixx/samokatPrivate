import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BasePrivateService } from '../base/base-private.service';
import { Statuses } from '../entities/Statuses';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class StatusesService extends BasePrivateService<Statuses> {
    name = 'statuses';

    constructor(
        @InjectRepository(Statuses) repo: Repository<Statuses>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }

    async createItem(data: any, isSendRmq = false): Promise<number> {
        const transformedData = { ...data };
        if (transformedData.name && !transformedData.status_name) {
            transformedData.status_name = transformedData.name;
            delete transformedData.name;
        }
        return super.createItem(transformedData, isSendRmq);
    }
}