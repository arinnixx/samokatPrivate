import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {CouriersService} from "./couriers.service";
import {Couriers} from "../entities/Couriers";
import {AuthGuard} from "../guard/auth.guard";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";
import {CreateCourierDto} from "./dto/create-couriers.dto";

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
        return await this.service.getCouriersByAggregator(aggregatorId);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() createDto: CreateCourierDto,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<Couriers> {
        return await this.service.createItem(createDto, aggregator);
    }

    @Get(':id/history')
    async getHistory(@Param('id') id: number) {
        return this.service.getHistory(id);
    }

}


