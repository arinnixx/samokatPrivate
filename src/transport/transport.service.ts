import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Transport} from "../entities/Transport";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class TransportService extends BaseService<Transport> {
    constructor(
        @InjectRepository(Transport) repo: Repository<Transport>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
