import { Module } from '@nestjs/common';
import { EmployeeAggregatorService } from './employee-aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeAggregator } from '../entities/EmployeeAggregator';

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeAggregator]),
    ],
    controllers: [],
    providers: [EmployeeAggregatorService],
    exports: [EmployeeAggregatorService],
})
export class EmployeeAggregatorModule {
}
