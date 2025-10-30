import { Injectable } from '@nestjs/common';
import { TransportType } from '../entities/TransportTypes';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';

@Injectable()

export class TransportTypesService extends BasePrivateService<TransportType> {
    name = 'transport-types';

    constructor(
        @InjectRepository(TransportType) repo: Repository<TransportType>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }
}
