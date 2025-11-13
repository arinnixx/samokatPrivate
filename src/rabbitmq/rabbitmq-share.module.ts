import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqModule } from './rabbitmq.module';
import { RequestLogsService } from '../request-logs/request-logs.service';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';
import { StatusTypeService } from '../status-type/status-type.service';
import { AggregatorService } from '../aggregator/aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { Couriers } from '../entities/Couriers';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';
import { StatusType } from '../entities/StatusType';
import { Aggregator } from '../entities/Aggregator';
import { RequestLog } from '../entities/RequestLogs';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
import { CouriersService } from '../couriers/couriers.service';
import { Passport } from '../entities/Passport';
import { DriverLicense } from '../entities/DriverLicense';
import { PassportService } from '../passport/passport.service';
import { DriverLicenseService } from '../driver-license/driverLicense.service';

@Module({
    imports: [
        RabbitmqModule,
        TypeOrmModule.forFeature([
            CouriersAggregator,
            Couriers,
            StatusType,
            DeliveryStatusHistory,
            Aggregator,
            RequestLog,
            Passport,
            DriverLicense,
        ]),
    ],
    controllers: [RabbitmqController],
    providers: [
        RabbitmqService,
        RequestLogsService,
        CouriersAggregatorService,
        CouriersService,
        DeliveryStatusHistoryService,
        StatusTypeService,
        AggregatorService,
        PassportService,
        DriverLicenseService,
    ],
    exports: [RabbitmqService],
})
export class RabbitmqShareModule {
}
