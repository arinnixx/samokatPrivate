import { Controller } from '@nestjs/common';
import {TransportTypesService} from "./transport-types.service";
import {TransportType} from "../entities/TransportTypes";
import {BasePrivateController} from "../base/base-private.controller";

@Controller('transport-types')
export class TransportTypesController extends BasePrivateController<TransportTypesService, TransportType> {
    constructor(
        service: TransportTypesService,
    ) {
        super(service);
    }
}
