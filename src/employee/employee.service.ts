import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Employee } from '../entities/Employee';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';

@Injectable()
export class EmployeeService extends BaseService<Employee> {
    name = "employee"
    constructor(
        @InjectRepository(Employee) repo: Repository<Employee>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }

    override rebuildData({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<Employee>
    }) {
        return super.rebuildData({ data });
    }
}
