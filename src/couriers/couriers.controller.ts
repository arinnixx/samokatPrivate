import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {CouriersService} from "./couriers.service";
import {Couriers} from "../entities/Couriers";
import {AuthGuard} from "../guard/auth.guard";
import {CreateDeliveryBagDto} from "../delivery-bags/dto/create-delivery-bag.dto";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";
import {DeliveryBags} from "../entities/DeliveryBags";
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
        // Используйте один из методов выше
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
}


