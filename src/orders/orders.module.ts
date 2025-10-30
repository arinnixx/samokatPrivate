import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Orders';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, DeliveryStatusHistory]),
        RabbitmqModule,
    ],
    controllers: [],
    providers: [OrdersService, DeliveryStatusHistoryService, RabbitmqService],
    exports: [OrdersService],
})
export class OrdersModule {
}
