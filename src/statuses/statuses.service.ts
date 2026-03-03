import { Injectable } from '@nestjs/common';
import { Statuses } from '../entities/Statuses';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';

@Injectable()
export class StatusesService extends BasePrivateService<Statuses> {
    name = 'statuses';

    constructor(
        @InjectRepository(Statuses) repo: Repository<Statuses>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }
}