import { Module } from '@nestjs/common';
import { CouriersAggregatorService } from './couriers-aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersAggregator } from '../entities/CouriersAggregator';

@Module({
    imports: [
        TypeOrmModule.forFeature([CouriersAggregator]),
    ],
    controllers: [],
    providers: [CouriersAggregatorService],
    exports: [CouriersAggregatorService],
})
export class CouriersAggregatorModule {
}
