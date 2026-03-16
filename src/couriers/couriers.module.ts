import { Module } from '@nestjs/common';
import { CouriersService } from './couriers.service';
import { Couriers } from '../entities/Couriers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
import { Passport } from '../entities/Passport';
import { DriverLicense } from '../entities/DriverLicense';
import { PassportService } from '../passport/passport.service';
import { DriverLicenseService } from '../driver-license/driverLicense.service';
import { CouriersController } from './couriers.controller';
import {TokenModule} from "../token/token.module";
import {CourierHistory} from "../entities/CourierHistory";

@Module({
    imports: [
        TypeOrmModule.forFeature([Couriers, CouriersAggregator, Passport, DriverLicense, CourierHistory]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [CouriersController],
    providers: [CouriersService, RabbitmqService, CouriersAggregatorService, PassportService, DriverLicenseService],
    exports: [CouriersService],
})
export class CouriersModule {
}
