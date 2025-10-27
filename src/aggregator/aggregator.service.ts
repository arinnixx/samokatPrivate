import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Aggregator} from "../entities/Aggregator";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class AggregatorService extends BaseService<Aggregator> {
    constructor(
        @InjectRepository(Aggregator) repo: Repository<Aggregator>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
