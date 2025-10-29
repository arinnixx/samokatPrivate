import { Injectable } from '@nestjs/common';
import { DeliveryStatus } from '../entities/DeliveryStatus';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';

@Injectable()
export class DeliveryStatusService extends BasePrivateService<DeliveryStatus> {
    name = 'delivery-status';

    constructor(
        @InjectRepository(DeliveryStatus) repo: Repository<DeliveryStatus>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }

}