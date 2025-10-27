import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {TransportType} from "../entities/TransportTypes";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class TransportTypesService extends BaseService<TransportType> {
    constructor(
        @InjectRepository(TransportType) repo: Repository<TransportType>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
