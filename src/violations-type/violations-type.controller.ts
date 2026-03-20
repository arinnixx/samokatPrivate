import {Controller, Delete, Get, Param} from '@nestjs/common';
import {BasePrivateController} from "../base/base-private.controller";
import {ViolationsTypeService} from "./violations-type.service";
import {ViolationsType} from "../entities/ViolationType";

@Controller('violations-type')
export class ViolationsTypeController extends BasePrivateController<ViolationsTypeService, ViolationsType> {
    constructor(
        service: ViolationsTypeService,
    ) {
        super(service);
    }

    @Get(':id/history')
    async getHistory(@Param('id') id: number) {
        return this.service.getHistory(id);
    }

}
