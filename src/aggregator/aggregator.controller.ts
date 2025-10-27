import {Controller, UseGuards} from '@nestjs/common';
import {AggregatorService} from './aggregator.service';
import {CreateAggregatorDto} from './dto/create-aggregator.dto';
import {UpdateAggregatorDto} from './dto/update-aggregator.dto';
import {BaseController} from "../base/base.controller";
import {Aggregator} from "../entities/Aggregator";
import {AdminController} from "../decorators/adminController";
import {MainGuard} from "../guard/main.guard";

@AdminController()
@UseGuards(MainGuard)
@Controller('aggregator')
export class AggregatorController extends BaseController<AggregatorService, Aggregator, CreateAggregatorDto, UpdateAggregatorDto> {
    constructor(
        service: AggregatorService
    ) {
        super(service)
    }
}
