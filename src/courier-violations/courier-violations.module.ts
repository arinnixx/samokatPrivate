import { Module } from '@nestjs/common';
import { CourierViolationsService } from './courier-violations.service';
import { Couriers } from '../entities/Couriers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Couriers, CouriersAggregator]),
        RabbitmqModule,
    ],
    controllers: [],
    providers: [CourierViolationsService, RabbitmqService, CouriersAggregatorService],
    exports: [CourierViolationsService],
})
export class CourierViolationsModule {
}
