import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { RequestLog } from '../entities/RequestLogs';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RequestLogsService extends BaseService<RequestLog> {
    constructor(
        @InjectRepository(RequestLog) repo: Repository<RequestLog>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
