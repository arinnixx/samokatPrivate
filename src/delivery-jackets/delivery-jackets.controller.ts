import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import {DeliveryJacketsService} from "./delivery-jackets.service";
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {AuthGuard} from "../guard/auth.guard";
import {CreateDeliveryBagDto} from "../delivery-bags/dto/create-delivery-bag.dto";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";
import {DeliveryBags} from "../entities/DeliveryBags";
import {CreateDeliveryJacketDto} from "./dto/create-delivery-jacket.dto";

@Controller('delivery-jackets')
export class DeliveryJacketsController extends BaseController<DeliveryJacketsService, DeliveryJackets> {
    constructor(
        service: DeliveryJacketsService,
    ) {
        super(service);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() createDto: CreateDeliveryJacketDto,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<DeliveryJackets> {
        return await this.service.createItem(createDto, aggregator);
    }
}
