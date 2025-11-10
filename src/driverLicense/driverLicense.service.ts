import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Employee } from '../entities/Employee';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { EmployeeAggregatorService } from '../employee-aggregator/employee-aggregator.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class DriverLicenseService extends BaseService<Employee> {
    name = 'employee';

    constructor(
        @InjectRepository(Employee) repo: Repository<Employee>,
        dataSource: DataSource,
        private employeeAggregatorService: EmployeeAggregatorService,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<Employee>
    }) {
        return super.rebuildAggregator({ data });
    }

    async createItem(aggregator: Aggregator, data: DeepPartial<Employee> & { personal_number: string }, {
        repo,
        manager,
    }: Repositories<Employee> = {}): Promise<Employee> {
        let item = await this.findOneBy({ snils: data.snils });
        if (!item) {
            item = await super.createItem(aggregator, data, {
                repo,
                manager,
            });
        }
        await this.rmqService.publish({
            id: item.id,
            name: this.name,
            method: 'POST',
            data: item,
        });
        await this.employeeAggregatorService.createItem(aggregator, { employee: item, personnel_number: data.personal_number });
        return item;
    }

}
