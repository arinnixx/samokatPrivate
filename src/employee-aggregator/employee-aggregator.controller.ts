import {Controller, UseGuards} from '@nestjs/common';
import {EmployeeAggregatorService} from './employee-aggregator.service';
import {CreateEmployeeAggregatorDto} from './dto/create-employee-aggregator.dto';
import {BaseController} from "../base/base.controller";
import {EmployeeAggregator} from "../entities/EmployeeAggregator";
import {UpdateEmployeeDto} from "../employee/dto/update-employee.dto";
import {AdminController} from "../decorators/adminController";
import {MainGuard} from "../guard/main.guard";

@AdminController()
@UseGuards(MainGuard)
@Controller('employee-aggregator')
export class EmployeeAggregatorController extends BaseController<EmployeeAggregatorService, EmployeeAggregator, CreateEmployeeAggregatorDto, UpdateEmployeeDto> {
    constructor(
        service: EmployeeAggregatorService,
    ) {
        super(service)
    }
}
