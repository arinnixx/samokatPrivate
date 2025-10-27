import {Controller} from '@nestjs/common';
import {TransportService} from './transport.service';
import {CreateTransportDto} from './dto/create-transport.dto';
import {UpdateTransportDto} from './dto/update-transport.dto';
import {BaseController} from "../base/base.controller";
import {Transport} from "../entities/Transport";

@Controller('transport')
export class TransportController extends BaseController<TransportService, Transport, CreateTransportDto, UpdateTransportDto> {
    constructor(
        service: TransportService
    ) {
        super(service)
    }
}
