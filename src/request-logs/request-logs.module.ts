import { Module } from '@nestjs/common';
import { RequestLogsService } from './request-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from '../entities/RequestLogs';
import { RequestLogsController } from './request-logs.controller';

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
