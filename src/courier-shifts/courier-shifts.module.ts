import { Module } from '@nestjs/common';
import { CourierShiftsService } from './courier-shifts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CourierShift } from '../entities/CourierShifts';
import { CourierShiftsController } from './courier-shifts.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([CourierShift]),
        RabbitmqModule,
    ],
    controllers: [CourierShiftsController],
    providers: [CourierShiftsService, RabbitmqService],
    exports: [CourierShiftsService],
})
export class CourierShiftsModule {
}
