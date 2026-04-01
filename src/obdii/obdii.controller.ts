import { Controller } from '@nestjs/common';
import { BasePrivateController } from '../base/base-private.controller';
import { ObdiiService } from './obdii.service';
import { Obdii } from '../entities/Obdii';

@Controller('obdii')
export class ObdiiController extends BasePrivateController<ObdiiService, Obdii> {
    constructor(service: ObdiiService) {
        super(service);
    }
}