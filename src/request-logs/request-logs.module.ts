import {Module} from '@nestjs/common';
import {RequestLogsService} from './request-logs.service';
import {RequestLogsController} from './request-logs.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RequestLog} from "../entities/RequestLogs";

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestLog]),
    ],
    controllers: [RequestLogsController],
    providers: [RequestLogsService],
    exports: [RequestLogsService],
})
export class RequestLogsModule {
}
