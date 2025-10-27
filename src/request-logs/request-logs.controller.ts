import {Controller, UseGuards} from '@nestjs/common';
import {RequestLogsService} from './request-logs.service';
import {CreateRequestLogDto} from './dto/create-request-log.dto';
import {UpdateRequestLogDto} from './dto/update-request-log.dto';
import {BaseController} from "../base/base.controller";
import {RequestLog} from "../entities/RequestLogs";
import {AdminController} from "../decorators/adminController";
import {MainGuard} from "../guard/main.guard";

@AdminController()
@UseGuards(MainGuard)
@Controller('request-logs')
export class RequestLogsController extends BaseController<RequestLogsService, RequestLog, CreateRequestLogDto, UpdateRequestLogDto> {
    constructor(
        service: RequestLogsService
    ) {
        super(service)
    }
}
