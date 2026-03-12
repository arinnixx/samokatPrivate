import { Module } from '@nestjs/common';
import { TransportTypesService } from './transport-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportType } from '../entities/TransportTypes';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import {TransportTypesController} from "./transport-types.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([TransportType]),
        RabbitmqModule,
    ],
    controllers: [TransportTypesController],
    providers: [TransportTypesService, RabbitmqService],
    exports: [TransportTypesService],
})
export class TransportTypesModule {
}

