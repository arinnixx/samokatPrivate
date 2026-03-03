import { Module } from '@nestjs/common';
import { CouriersAggregatorService } from './couriers-aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CouriersAggregatorController } from './couriers-aggregator.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CouriersAggregator]),
        RabbitmqModule,
    ],
    controllers: [CouriersAggregatorController],
    providers: [CouriersAggregatorService, RabbitmqService],
    exports: [CouriersAggregatorService],
})
export class CouriersAggregatorModule {
}
