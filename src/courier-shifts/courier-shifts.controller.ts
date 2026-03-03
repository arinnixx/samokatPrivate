import { Controller } from '@nestjs/common';
import { CourierShiftsService } from './courier-shifts.service';
import { BaseController } from '../base/base.controller';
import { CourierShift } from '../entities/CourierShifts';

@Controller('courier-shifts')
export class CourierShiftsController extends BaseController<CourierShiftsService, CourierShift> {
    constructor(
        service: CourierShiftsService,
    ) {
        super(service);
    }
}
