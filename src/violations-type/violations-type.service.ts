import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ViolationsType } from '../entities/ViolationType';
import { BasePrivateService } from '../base/base-private.service';

@Injectable()
export class ViolationsTypeService extends BasePrivateService<ViolationsType> {
    name = 'violations-type';

    constructor(
        @InjectRepository(ViolationsType) repo: Repository<ViolationsType>,
        dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }
}
