import {Module} from '@nestjs/common';
import {DeliveryStatusService} from './delivery-status.service';
import {DeliveryStatusController} from './delivery-status.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeliveryStatus} from "../entities/DeliveryStatus";
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryStatus]),
        RabbitmqModule
    ],
    controllers: [DeliveryStatusController],
    providers: [DeliveryStatusService,RabbitmqService],
    exports: [DeliveryStatusService],
})
export class DeliveryStatusModule {
}
