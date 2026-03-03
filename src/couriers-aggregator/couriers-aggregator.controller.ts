import { Controller } from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {CouriersAggregatorService} from "./couriers-aggregator.service";
import {CouriersAggregator} from "../entities/CouriersAggregator";

@Controller('couriers-aggregator')
export class CouriersAggregatorController extends BaseController<CouriersAggregatorService, CouriersAggregator> {
    constructor(
        service: CouriersAggregatorService,
    ) {
        super(service);
    }
}
