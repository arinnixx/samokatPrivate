import { Injectable } from '@nestjs/common';
import { StatusType } from '../entities/StatusType';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';

@Injectable()
export class StatusTypeService extends BasePrivateService<StatusType> {
    name = 'status-type';

    constructor(
        @InjectRepository(StatusType) repo: Repository<StatusType>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }

}