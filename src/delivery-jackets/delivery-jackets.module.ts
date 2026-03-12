import { Module } from '@nestjs/common';
import { DeliveryJacketsService } from './delivery-jackets.service';
import { DeliveryJackets } from '../entities/DeliveryJackets';
import { TypeOrmModule } from '@nestjs/typeorm';
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {RabbitmqModule} from "../rabbitmq/rabbitmq.module";
import {DeliveryJacketsController} from "./delivery-jackets.controller";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryJackets]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [DeliveryJacketsController],
    providers: [DeliveryJacketsService, RabbitmqService],
    exports: [DeliveryJacketsService],
})
export class DeliveryJacketsModule {
}
