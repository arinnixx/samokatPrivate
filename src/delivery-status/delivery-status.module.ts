import {Module} from '@nestjs/common';
import {DeliveryStatusService} from './delivery-status.service';
import {DeliveryStatusController} from './delivery-status.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeliveryStatus} from "../entities/DeliveryStatus";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryStatus]),
    ],
    controllers: [DeliveryStatusController],
    providers: [DeliveryStatusService],
    exports: [DeliveryStatusService],
})
export class DeliveryStatusModule {
}
