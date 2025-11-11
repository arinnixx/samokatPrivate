import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AggregatorModule } from './aggregator/aggregator.module';
import { StatusTypeModule } from './status-type/status-type.module';
import { RequestLogsModule } from './request-logs/request-logs.module';
import { DeliveryStatusHistoryModule } from './delivery-status-history/delivery-status-history.module';
import { ConfigModule } from '@nestjs/config';
import entities from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqShareModule } from './rabbitmq/rabbitmq-share.module';
import { CouriersModule } from './couriers/couriers.module';
import { CouriersAggregatorModule } from './couriers-aggregator/couriers-aggregator.module';

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
        StatusTypeModule,
        CouriersModule,
        CouriersAggregatorModule,
        RequestLogsModule,
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
