import {Module} from '@nestjs/common';
import {EmployeeAggregatorService} from './employee-aggregator.service';
import {EmployeeAggregatorController} from './employee-aggregator.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeAggregator} from "../entities/EmployeeAggregator";

@Module({
    imports: [
        TypeOrmModule.forFeature([EmployeeAggregator]),
    ],
    controllers: [EmployeeAggregatorController],
    providers: [EmployeeAggregatorService],
    exports: [EmployeeAggregatorService],
})
export class EmployeeAggregatorModule {
}
