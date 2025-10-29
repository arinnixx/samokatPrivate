import { Module } from '@nestjs/common';
import { TransportTypesService } from './transport-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportType } from '../entities/TransportTypes';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([TransportType]),
        RabbitmqModule,
    ],
    controllers: [],
    providers: [TransportTypesService, RabbitmqService],
    exports: [TransportTypesService],
})
export class TransportTypesModule {
}
