import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Orders';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import {OrdersController} from "./orders.controller";
import {TokenModule} from "../token/token.module";
import {OrderHistory} from "../entities/OrderHistory";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderHistory]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService,RabbitmqService],
    exports: [OrdersService],
})
export class OrdersModule {
}
