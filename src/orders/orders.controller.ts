import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import {OrdersService} from "./orders.service";
import {Order} from "../entities/Orders";
import {AuthGuard} from "../guard/auth.guard";
import {CreateTransportDto} from "../transport/dto/create-transport.dto";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";
import {Transport} from "../entities/Transport";
import {CreateOrderDto} from "./dto/create-order.dto";

@Controller('orders')
export class OrdersController extends BaseController<OrdersService, Order> {
    constructor(
        service: OrdersService,
    ) {
        super(service);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() createDto: CreateOrderDto,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<Order> {
        return await this.service.createItem(createDto, aggregator);
    }

    @Get(':id/history')
    async getHistory(@Param('id') id: number) {
        return this.service.getHistory(id);
    }
}
