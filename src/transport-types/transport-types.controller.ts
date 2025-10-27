import {Controller, UseGuards} from '@nestjs/common';
import {TransportTypesService} from './transport-types.service';
import {CreateTransportTypeDto} from './dto/create-transport-type.dto';
import {UpdateTransportTypeDto} from './dto/update-transport-type.dto';
import {TransportType} from "../entities/TransportTypes";
import {BaseController} from "../base/base.controller";
import {AdminController} from "../decorators/adminController";
import {MainGuard} from "../guard/main.guard";

@AdminController()
@UseGuards(MainGuard)
@Controller('transport-types')
export class TransportTypesController extends BaseController<TransportTypesService, TransportType, CreateTransportTypeDto, UpdateTransportTypeDto> {
    constructor(
        service: TransportTypesService
    ) {
        super(service)
    }
}
