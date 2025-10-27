import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {DeliveryStatus} from "../entities/DeliveryStatus";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class DeliveryStatusService extends BaseService<DeliveryStatus> {
    constructor(
        @InjectRepository(DeliveryStatus) repo: Repository<DeliveryStatus>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }

}
