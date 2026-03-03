import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statuses } from '../entities/Statuses';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { StatusesController } from './statuses.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Statuses]),
        RabbitmqModule,
    ],
    controllers: [StatusesController],
    providers: [StatusesService, RabbitmqService],
    exports: [StatusesService],
})
export class StatusesModule {
}
