import {Controller} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {EmployeeService} from "./employee.service";
import {Employee} from "../entities/Employee";
import {CreateEmployeeDto} from "./dto/create-employee.dto";
import {UpdateEmployeeDto} from "./dto/update-employee.dto";

@Controller('employee')
export class EmployeeController extends BaseController<EmployeeService, Employee, CreateEmployeeDto, UpdateEmployeeDto> {
    constructor(
        service: EmployeeService,
    ) {
        super(service)
    }
}
