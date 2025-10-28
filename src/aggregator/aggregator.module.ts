import {Module} from '@nestjs/common';
import {AggregatorService} from './aggregator.service';
import {AggregatorController} from './aggregator.controller';
import {Aggregator} from "../entities/Aggregator";
import {TypeOrmModule} from "@nestjs/typeorm";
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Aggregator]),
        RabbitmqModule
    ],
    controllers: [AggregatorController],
    providers: [AggregatorService,RabbitmqService],
    exports: [AggregatorService]
})
export class AggregatorModule {
}
