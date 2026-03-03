import { Controller } from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {CourierViolations} from "../entities/CourierViolations";
import {CourierViolationsService} from "./courier-violations.service";

@Controller('courier-violations')
export class CourierViolationsController extends BaseController<CourierViolationsService, CourierViolations> {
    constructor(
        service: CourierViolationsService,
    ) {
        super(service);
    }
}
