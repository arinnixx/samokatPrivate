import { Module } from '@nestjs/common';
import { CourierViolationsService } from './courier-violations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CourierViolations } from '../entities/CourierViolations';
import { CourierViolationsController } from './courier-violations.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CourierViolations]),
        RabbitmqModule,
    ],
    controllers: [CourierViolationsController],
    providers: [CourierViolationsService, RabbitmqService],
    exports: [CourierViolationsService],
})
export class CourierViolationsModule {
}
