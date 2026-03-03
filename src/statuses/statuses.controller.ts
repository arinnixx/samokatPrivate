import { Controller } from '@nestjs/common';
import {StatusesService} from "./statuses.service";
import {Statuses} from "../entities/Statuses";
import {BasePrivateController} from "../base/base-private.controller";

@Controller('statuses')
export class StatusesController extends BasePrivateController<StatusesService, Statuses> {
    constructor(
        service: StatusesService,
    ) {
        super(service);
    }
}
