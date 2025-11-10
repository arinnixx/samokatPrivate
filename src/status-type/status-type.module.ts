import { Module } from '@nestjs/common';
import { StatusTypeService } from './status-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusType } from '../entities/StatusType';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([StatusType]),
        RabbitmqModule,
    ],
    controllers: [],
    providers: [StatusTypeService, RabbitmqService],
    exports: [StatusTypeService],
})
export class StatusTypeModule {
}
