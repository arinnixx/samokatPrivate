import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AggregatorModule} from './aggregator/aggregator.module';
import {DeliveryBagsModule} from './delivery-bags/delivery-bags.module';
import {DeliveryJacketsModule} from './delivery-jackets/delivery-jackets.module';
import {DeliveryStatusModule} from './delivery-status/delivery-status.module';
import {EmployeeModule} from './employee/employee.module';
import {EmployeeAggregatorModule} from './employee-aggregator/employee-aggregator.module';
import {OrdersModule} from './orders/orders.module';
import {TransportModule} from './transport/transport.module';
import {RequestLogsModule} from './request-logs/request-logs.module';
import {TransportTypesModule} from './transport-types/transport-types.module';
import {DeliveryStatusHistoryModule} from './delivery-status-history/delivery-status-history.module';
import {ConfigModule} from "@nestjs/config";
import entities from "./entities";
import {TypeOrmModule} from "@nestjs/typeorm";
import {APP_GUARD} from "@nestjs/core";
import {AuthGuard} from "./guard/auth.guard";
import {RabbitMQModule} from "@golevelup/nestjs-rabbitmq";
import {RabbitmqController} from "./rabbitmq/rabbitmq.controller";
import {RabbitmqService} from "./rabbitmq/rabbitmq.service";

@Module({
    imports: [
        RabbitMQModule.forRootAsync({
            useFactory: () => ({
                queues: [
                    {
                        name: process.env.RMQ_QUEUE_PRIVATE ?? 'to_private',
                        options: {
                            durable: true,
                        },
                    },
                ],
                connectionInitOptions: {
                    wait: false,
                },
                channels: {
                    default: {
                        default: true,
                        prefetchCount: 1,
                    },
                },
                uri: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_URL}`,
                enableControllerDiscovery: true,
            }),
        }),
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
        DeliveryStatusHistoryModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AppService, RabbitmqController, RabbitmqService

    ],
})
export class AppModule {
}
