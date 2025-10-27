import {Controller} from '@nestjs/common';
import {DeliveryBagsService} from './delivery-bags.service';
import {CreateDeliveryBagDto} from './dto/create-delivery-bag.dto';
import {UpdateDeliveryBagDto} from './dto/update-delivery-bag.dto';
import {BaseController} from "../base/base.controller";
import {DeliveryBags} from "../entities/DeliveryBags";

@Controller('delivery-bags')
export class DeliveryBagsController extends BaseController<DeliveryBagsService, DeliveryBags, CreateDeliveryBagDto, UpdateDeliveryBagDto> {
    constructor(
        service: DeliveryBagsService,
    ) {
        super(service)
    }
}
