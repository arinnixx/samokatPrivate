import { Controller } from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {RequestLogsService} from "./request-logs.service";
import {RequestLog} from "../entities/RequestLogs";

@Controller('request-logs')
export class RequestLogsController extends BaseController<RequestLogsService, RequestLog> {
    constructor(
        service: RequestLogsService,
    ) {
        super(service);
    }
}
