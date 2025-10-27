import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {DataSource, Repository} from "typeorm";
import {BaseService} from "../base/base.service";

@Injectable()
export class DeliveryJacketsService extends BaseService<DeliveryJackets> {
    constructor(
        @InjectRepository(DeliveryJackets) repo: Repository<DeliveryJackets>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
