import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obdii } from '../entities/Obdii';
import { ObdiiService } from './obdii.service';
import { ObdiiController } from './obdii.controller';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import {RabbitmqService} from "../rabbitmq/rabbitmq.service";
import {TokenModule} from "../token/token.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Obdii]),
        RabbitmqModule,
        TokenModule
    ],
    controllers: [ObdiiController],
    providers: [ObdiiService, RabbitmqService],
    exports: [ObdiiService],
})
export class ObdiiModule {}