import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {DeliveryBags} from "../entities/DeliveryBags";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class DeliveryBagsService extends BaseService<DeliveryBags> {
    constructor(
        @InjectRepository(DeliveryBags) repo: Repository<DeliveryBags>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
