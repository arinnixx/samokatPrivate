import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregatorModule } from './aggregator/aggregator.module';
import { DeliveryBagsModule } from './delivery-bags/delivery-bags.module';
import { DeliveryJacketsModule } from './delivery-jackets/delivery-jackets.module';
import { DeliveryStatusModule } from './delivery-status/delivery-status.module';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeAggregatorModule } from './employee-aggregator/employee-aggregator.module';
import { OrdersModule } from './orders/orders.module';
import { TransportModule } from './transport/transport.module';
import { RequestLogsModule } from './request-logs/request-logs.module';
import { TransportTypesModule } from './transport-types/transport-types.module';
import { DeliveryStatusHistoryModule } from './delivery-status-history/delivery-status-history.module';
import { ConfigModule } from '@nestjs/config';
import entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqShareModule } from './rabbitmq/rabbitmq-share.module';

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
        DeliveryBagsModule,
        DeliveryJacketsModule,
        DeliveryStatusModule,
        EmployeeModule,
        EmployeeAggregatorModule,
        OrdersModule,
        TransportModule,
        RequestLogsModule,
        TransportTypesModule,
        DeliveryStatusHistoryModule,
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
