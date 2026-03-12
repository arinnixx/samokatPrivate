import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Orders';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import {OrdersController} from "./orders.controller";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Order]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [OrdersController],
    providers: [OrdersService,RabbitmqService],
    exports: [OrdersService],
})
export class OrdersModule {
}
