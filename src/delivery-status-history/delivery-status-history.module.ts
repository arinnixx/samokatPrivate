import { Module } from '@nestjs/common';
import { DeliveryStatusHistoryService } from './delivery-status-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryStatusHistory]),
        RabbitmqModule,
    ],
    controllers: [],
    providers: [DeliveryStatusHistoryService, RabbitmqService],
    exports: [DeliveryStatusHistoryService],
})
export class DeliveryStatusHistoryModule {
}
