import {Injectable} from '@nestjs/common';
import {BaseService} from "../base/base.service";
import {Employee} from "../entities/Employee";
import {InjectRepository} from "@nestjs/typeorm";
import {DataSource, Repository} from "typeorm";

@Injectable()
export class EmployeeService extends BaseService<Employee> {
    constructor(
        @InjectRepository(Employee) repo: Repository<Employee>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }

}
