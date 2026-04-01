import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { BasePrivateService } from '../base/base-private.service';
import { Obdii } from '../entities/Obdii';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class ObdiiService extends BasePrivateService<Obdii> {
    name = 'obdii';

    constructor(
        @InjectRepository(Obdii) repo: Repository<Obdii>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }
}