import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { EmployeeAggregator } from '../entities/EmployeeAggregator';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class EmployeeAggregatorService extends BaseService<EmployeeAggregator> {
    name = "employee-aggregator";
    constructor(
        @InjectRepository(EmployeeAggregator) repo: Repository<EmployeeAggregator>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
