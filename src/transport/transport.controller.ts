import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import {Transport} from "../entities/Transport";
import {TransportService} from "./transport.service";
import {AuthGuard} from "../guard/auth.guard";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";
import {CreateTransportDto} from "./dto/create-transport.dto";

@Controller('transport')
export class TransportController extends BaseController<TransportService, Transport> {
    constructor(
        service: TransportService,
    ) {
        super(service);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() createDto: CreateTransportDto,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<Transport> {
        return await this.service.createItem(createDto, aggregator);
    }
}
