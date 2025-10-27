import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {DeliveryStatusHistory} from "../entities/deliveryStatusHistory";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class DeliveryStatusHistoryService extends BaseService<DeliveryStatusHistory> {
    constructor(
        @InjectRepository(DeliveryStatusHistory) repo: Repository<DeliveryStatusHistory>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
