import { Module } from '@nestjs/common';
import { DeliveryBagsService } from './delivery-bags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryBags } from '../entities/DeliveryBags';
import { Aggregator } from '../entities/Aggregator';
import {RabbitmqModule} from "../rabbitmq/rabbitmq.module";
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {DeliveryBagsController} from "./delivery-bags.controller";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryBags, Aggregator]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [DeliveryBagsController],
    providers: [DeliveryBagsService, RabbitmqService],
    exports: [DeliveryBagsService],
})
export class DeliveryBagsModule {
}
