import { Injectable } from '@nestjs/common';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BasePrivateService } from '../base/base-private.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class DeliveryStatusHistoryService extends BasePrivateService<DeliveryStatusHistory> {
    constructor(
        @InjectRepository(DeliveryStatusHistory) repo: Repository<DeliveryStatusHistory>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
    ) {
        super(repo, dataSource, rmqService);
    }
}
