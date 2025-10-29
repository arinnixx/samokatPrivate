import { Module } from '@nestjs/common';
import { RequestLogsService } from './request-logs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestLog } from '../entities/RequestLogs';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestLog]),
    ],
    controllers: [],
    providers: [RequestLogsService],
    exports: [RequestLogsService],
})
export class RequestLogsModule {
}
