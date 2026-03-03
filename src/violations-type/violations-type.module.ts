import { Module } from '@nestjs/common';
import { ViolationsTypeService } from './violations-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { ViolationsType } from '../entities/ViolationType';
import { ViolationsTypeController } from './violations-type.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ViolationsType]),
        RabbitmqModule,
    ],
    controllers: [ViolationsTypeController],
    providers: [ViolationsTypeService, RabbitmqService],
    exports: [ViolationsTypeService],
})
export class ViolationsTypeModule {
}
