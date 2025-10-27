import {Controller, UseGuards} from '@nestjs/common';
import {DeliveryStatusService} from './delivery-status.service';
import {CreateDeliveryStatusDto} from './dto/create-delivery-status.dto';
import {UpdateDeliveryStatusDto} from './dto/update-delivery-status.dto';
import {BaseController} from "../base/base.controller";
import {DeliveryStatus} from "../entities/DeliveryStatus";
import {AdminController} from "../decorators/adminController";
import {MainGuard} from "../guard/main.guard";

@AdminController()
@UseGuards(MainGuard)
@Controller('delivery-status')
export class DeliveryStatusController extends BaseController<DeliveryStatusService, DeliveryStatus, CreateDeliveryStatusDto, UpdateDeliveryStatusDto> {
    constructor(
        service: DeliveryStatusService,
    ) {
        super(service)
    }
}
