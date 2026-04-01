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
import {DeliveryBags} from "../entities/DeliveryBags";
import {Order} from "../entities/Orders";
import {Transport} from "../entities/Transport";
import {TransportType} from "../entities/TransportTypes";
import {DeliveryJacketsService} from "../delivery-jackets/delivery-jackets.service";
import {DeliveryBagsService} from "../delivery-bags/delivery-bags.service";
import {OrdersService} from "../orders/orders.service";
import {TransportService} from "../transport/transport.service";
import {TransportTypesService} from "../transport-types/transport-types.service";
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {CourierHistory} from "../entities/CourierHistory";
import {OrderHistory} from "../entities/OrderHistory";
import {ViolationsTypeHistory} from "../entities/ViolationTypeHistory";
import {StatusesHistory} from "../entities/StatusesHistory";
import {TransportTypeHistory} from "../entities/TransportTypeHistory";
import {TransportObdii} from "../entities/TransportObdii";
import {Obdii} from "../entities/Obdii";
import {ObdiiService} from "../obdii/obdii.service";
import {TransportObdiiService} from "../transport-obdii/transport-obdii.service";

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
            DeliveryBags,
            DeliveryJackets,
            Order,
            Transport,
            TransportType,
            CourierHistory,
            OrderHistory,
            ViolationsTypeHistory,
            StatusesHistory,
            TransportTypeHistory,
            TransportObdii,
            Obdii
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
        DeliveryBagsService,
        DeliveryJacketsService,
        OrdersService,
        TransportService,
        TransportTypesService,
        ObdiiService,
        TransportObdiiService
    ],
    exports: [RabbitmqService],
})
export class RabbitmqShareModule {
}
