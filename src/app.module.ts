import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregatorModule } from './aggregator/aggregator.module';
import { StatusesModule } from './statuses/statuses.module';
import { RequestLogsModule } from './request-logs/request-logs.module';
import { ConfigModule } from '@nestjs/config';
import entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqShareModule } from './rabbitmq/rabbitmq-share.module';
import { CouriersModule } from './couriers/couriers.module';
import { CouriersAggregatorModule } from './couriers-aggregator/couriers-aggregator.module';
import { AdminModule} from "./admin/admin.module";
import { TokenModule } from './token/token.module';
import {DriverLicenseModule} from "./driver-license/driverLicense.module";
import {PassportModule} from "./passport/passport.module";
import {CourierShiftsModule} from "./courier-shifts/courier-shifts.module";
import {CourierViolationsModule} from "./courier-violations/courier-violations.module";
import {ViolationsTypeModule} from "./violations-type/violations-type.module";
import {DeliveryJacketsModule} from "./delivery-jackets/delivery-jackets.module";
import {DeliveryBagsModule} from "./delivery-bags/delivery-bags.module";
import {OrdersModule} from "./orders/orders.module";
import {TransportModule} from "./transport/transport.module";
import {TransportTypesModule} from "./transport-types/transport-types.module";
import {ObdiiModule} from "./obdii/obdii.module";
import {TransportObdiiModule} from "./transport-obdii/transport-obdii.module";


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'postgres',
                host: process.env.PG_HOST,
                port: +process.env.PG_PORT,
                username: process.env.PG_USER,
                password: process.env.PG_PASSWORD,
                database: process.env.PG_DATABASE,
                entities,
                synchronize: process.env.IS_SYNCHRONIZE === 'true',
            }),
        }),
        RabbitmqShareModule,
        AggregatorModule,
        StatusesModule,
        CouriersModule,
        CouriersAggregatorModule,
        RequestLogsModule,
        TokenModule,
        AdminModule,
        DriverLicenseModule,
        PassportModule,
        CourierShiftsModule,
        CourierViolationsModule,
        ViolationsTypeModule,
        OrdersModule,
        DeliveryBagsModule,
        DeliveryJacketsModule,
        TransportModule,
        TransportTypesModule,
        ObdiiModule,
        TransportObdiiModule
    ],
    controllers: [AppController],
    providers: [
        // {
        //     // provide: APP_GUARD,
        //     useClass: AuthGuard,
        // },
        AppService,
    ],
})
export class AppModule {
}
