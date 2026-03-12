import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from '../entities/Transport';
import {RabbitmqModule} from "../rabbitmq/rabbitmq.module";
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {TransportController} from "./transport.controller";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transport]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [TransportController],
    providers: [TransportService,RabbitmqService],
    exports: [TransportService],
})
export class TransportModule {
}
