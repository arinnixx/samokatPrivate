import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/Orders';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, DeliveryStatusHistory]),
    ],
    controllers: [],
    providers: [OrdersService, DeliveryStatusHistoryService],
    exports: [OrdersService],
})
export class OrdersModule {
}
