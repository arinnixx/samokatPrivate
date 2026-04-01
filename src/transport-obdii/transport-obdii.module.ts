import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportObdii } from '../entities/TransportObdii';
import { TransportObdiiService } from './transport-obdii.service';
import { TransportObdiiController } from './transport-obdii.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { TransportModule } from '../transport/transport.module';
import { ObdiiModule } from '../obdii/obdii.module';
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([TransportObdii]),
        RabbitmqModule,
        TransportModule,
        ObdiiModule,
        TokenModule
    ],
    controllers: [TransportObdiiController],
    providers: [TransportObdiiService, RabbitmqService],
    exports: [TransportObdiiService],
})
export class TransportObdiiModule {}