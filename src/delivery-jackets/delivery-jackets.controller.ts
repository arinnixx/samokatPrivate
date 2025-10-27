import {Controller} from '@nestjs/common';
import {DeliveryJacketsService} from './delivery-jackets.service';
import {BaseController} from "../base/base.controller";
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {CreateDeliveryJacketDto} from "./dto/create-delivery-jacket.dto";
import {UpdateDeliveryJacketDto} from "./dto/update-delivery-jacket.dto";

@Controller('delivery-jackets')
export class DeliveryJacketsController extends BaseController<DeliveryJacketsService, DeliveryJackets, CreateDeliveryJacketDto, UpdateDeliveryJacketDto> {
    constructor(
        service: DeliveryJacketsService
    ) {
        super(service)
    }
}
