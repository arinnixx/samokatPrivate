import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqModule } from './rabbitmq.module';
import { RequestLogsService } from '../request-logs/request-logs.service';
import { StatusesService } from '../statuses/statuses.service';
import { AggregatorService } from '../aggregator/aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { Couriers } from '../entities/Couriers';
import { Statuses } from '../entities/Statuses';
import { Aggregator } from '../entities/Aggregator';
import { RequestLog } from '../entities/RequestLogs';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
import { CouriersService } from '../couriers/couriers.service';
import { Passport } from '../entities/Passport';
import { DriverLicense } from '../entities/DriverLicense';
import { PassportService } from '../passport/passport.service';
import { DriverLicenseService } from '../driver-license/driverLicense.service';
import { ViolationsTypeService } from '../violations-type/violations-type.service';
import { ViolationsType } from '../entities/ViolationType';
import { TokenService } from '../token/token.service';
import { CourierShiftsService } from '../courier-shifts/courier-shifts.service';
import { CourierShift } from '../entities/CourierShifts';
import { CourierViolationsService } from '../courier-violations/courier-violations.service';
import { CourierViolations } from '../entities/CourierViolations';
import { Admin} from "../entities/Admin";
import {AdminService} from "../admin/admin.service";

@Module({
    imports: [
        RabbitmqModule,
        TypeOrmModule.forFeature([
            CouriersAggregator,
            Couriers,
            Statuses,
            Aggregator,
            RequestLog,
            Passport,
            DriverLicense,
            ViolationsType,
            CourierShift,
            CourierViolations,
            Admin,
        ]),
    ],
    controllers: [RabbitmqController],
    providers: [
        RabbitmqService,
        RequestLogsService,
        CouriersAggregatorService,
        CouriersService,
        StatusesService,
        AggregatorService,
        PassportService,
        DriverLicenseService,
        ViolationsTypeService,
        TokenService,
        CourierShiftsService,
        CourierViolationsService,
        AdminService,
    ],
    exports: [RabbitmqService],
})
export class RabbitmqShareModule {
}
