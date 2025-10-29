import { Module } from '@nestjs/common';
import { DeliveryStatusHistoryService } from './delivery-status-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryStatusHistory]),
    ],
    controllers: [],
    providers: [DeliveryStatusHistoryService],
    exports: [DeliveryStatusHistoryService],
})
export class DeliveryStatusHistoryModule {
}
