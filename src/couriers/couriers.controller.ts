import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {CouriersService} from "./couriers.service";
import {Couriers} from "../entities/Couriers";
import {AuthGuard} from "../guard/auth.guard";

@Controller('couriers')
export class CouriersController extends BaseController<CouriersService, Couriers> {
    constructor(
        service: CouriersService,
    ) {
        super(service);
    }

    @Get('by-aggregator/:aggregatorId')
    @UseGuards(AuthGuard)
    async getCouriersByAggregator(
        @Param('aggregatorId') aggregatorId: number,
    ) {
        // Используйте один из методов выше
        return await this.service.getCouriersByAggregator(aggregatorId);
    }
}


