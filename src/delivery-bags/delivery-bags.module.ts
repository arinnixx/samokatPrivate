import { Module } from '@nestjs/common';
import { DeliveryBagsService } from './delivery-bags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryBags } from '../entities/DeliveryBags';
import { Aggregator } from '../entities/Aggregator';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryBags, Aggregator]),
    ],
    controllers: [],
    providers: [DeliveryBagsService],
    exports: [DeliveryBagsService],
})
export class DeliveryBagsModule {
}
