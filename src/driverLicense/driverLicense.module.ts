import { Module } from '@nestjs/common';
import { DriverLicenseService } from './driverLicense.service';
import { Employee } from '../entities/Employee';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { EmployeeAggregatorService } from '../employee-aggregator/employee-aggregator.service';
import { EmployeeAggregator } from '../entities/EmployeeAggregator';

@Module({
    imports: [
        TypeOrmModule.forFeature([Employee,EmployeeAggregator]),
        RabbitmqModule,
    ],
    controllers: [],
    providers: [DriverLicenseService,RabbitmqService,EmployeeAggregatorService],
    exports: [DriverLicenseService],
})
export class DriverLicenseModule {
}
