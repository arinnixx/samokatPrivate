import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Aggregator} from "../entities/Aggregator";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { BasePrivateService } from '../base/base-private.service';

@Injectable()
export class AggregatorService extends BasePrivateService<Aggregator> {
    name = 'aggregator';
    constructor(
        @InjectRepository(Aggregator) repo: Repository<Aggregator>,
        dataSource: DataSource,
        rmqService: RabbitmqService,
    ) {
        super(repo, dataSource,rmqService);
    }
}
