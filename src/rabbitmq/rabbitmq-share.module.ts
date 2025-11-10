import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqModule } from './rabbitmq.module';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { TransportService } from '../transport/transport.service';
import { RequestLogsService } from '../request-logs/request-logs.service';
import { OrdersService } from '../orders/orders.service';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';
import { StatusTypeService } from '../status-type/status-type.service';
import { DeliveryJacketsService } from '../delivery-jackets/delivery-jackets.service';
import { DeliveryBagsService } from '../delivery-bags/delivery-bags.service';
import { AggregatorService } from '../aggregator/aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportType } from '../entities/TransportTypes';
import { Transport } from '../entities/Transport';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { Order } from '../entities/Orders';
import { Couriers } from '../entities/Couriers';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';
import { StatusType } from '../entities/StatusType';
import { DeliveryJackets } from '../entities/DeliveryJackets';
import { DeliveryBags } from '../entities/DeliveryBags';
import { Aggregator } from '../entities/Aggregator';
import { RequestLog } from '../entities/RequestLogs';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
import { CouriersService } from '../couriers/couriers.service';

@Module({
    imports: [
        RabbitmqModule,
        TypeOrmModule.forFeature([
            TransportType,
            Transport,
            Order,
            CouriersAggregator,
            Couriers,
            StatusType,
            DeliveryStatusHistory,
            DeliveryJackets,
            DeliveryBags,
            Aggregator,
            RequestLog,
        ]),
    ],
    controllers: [RabbitmqController],
    providers: [
        RabbitmqService,
        TransportTypesService,
        TransportService,
        RequestLogsService,
        OrdersService,
        CouriersAggregatorService,
        CouriersService,
        DeliveryStatusHistoryService,
        StatusTypeService,
        DeliveryJacketsService,
        DeliveryBagsService,
        AggregatorService,
    ],
    exports: [RabbitmqService],
})
export class RabbitmqShareModule {
}
