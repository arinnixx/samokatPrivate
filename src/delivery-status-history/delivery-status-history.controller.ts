import {Controller, UseGuards} from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {DeliveryStatusHistoryService} from "./delivery-status-history.service";
import {DeliveryStatusHistory} from "../entities/deliveryStatusHistory";
import {CreateDeliveryStatusHistoryDto} from "./dto/create-delivery-status-history.dto";
import {UpdateDeliveryStatusHistoryDto} from "./dto/update-delivery-status-history.dto";
import {AdminController} from "../decorators/adminController";
import {MainGuard} from "../guard/main.guard";

@AdminController()
@UseGuards(MainGuard)
@Controller('delivery-status-history')
export class DeliveryStatusHistoryController extends BaseController<DeliveryStatusHistoryService, DeliveryStatusHistory, CreateDeliveryStatusHistoryDto, UpdateDeliveryStatusHistoryDto> {
    constructor(
        service: DeliveryStatusHistoryService,
    ) {
        super(service)
    }
}
