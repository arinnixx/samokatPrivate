import {Body, Controller, Patch, Post, UseGuards} from '@nestjs/common';
import { BaseController } from '../base/base.controller';
import {DeliveryBagsService} from "./delivery-bags.service";
import {DeliveryBags} from "../entities/DeliveryBags";
import {AuthGuard} from "../guard/auth.guard";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";
import {CreateDeliveryBagDto} from "./dto/create-delivery-bag.dto";

@Controller('delivery-bags')
export class DeliveryBagsController extends BaseController<DeliveryBagsService, DeliveryBags> {
    constructor(
        service: DeliveryBagsService,
    ) {
        super(service);
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
        @Body() createDto: CreateDeliveryBagDto,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<DeliveryBags> {
        return await this.service.createItem(createDto, aggregator);
    }

}
