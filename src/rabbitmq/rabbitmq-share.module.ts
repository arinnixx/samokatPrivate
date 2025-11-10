import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqModule } from './rabbitmq.module';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { TransportService } from '../transport/transport.service';
import { RequestLogsService } from '../request-logs/request-logs.service';
import { OrdersService } from '../orders/orders.service';
import { EmployeeAggregatorService } from '../employee-aggregator/employee-aggregator.service';
import { EmployeeService } from '../employee/employee.service';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';
import { StatusTypeService } from '../status-type/status-type.service';
import { DeliveryJacketsService } from '../delivery-jackets/delivery-jackets.service';
import { DeliveryBagsService } from '../delivery-bags/delivery-bags.service';
import { AggregatorService } from '../aggregator/aggregator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportType } from '../entities/TransportTypes';
import { Transport } from '../entities/Transport';
import { EmployeeAggregator } from '../entities/EmployeeAggregator';
import { Order } from '../entities/Orders';
import { Employee } from '../entities/Employee';
import { DeliveryStatusHistory } from '../entities/deliveryStatusHistory';
import { StatusType } from '../entities/StatusType';
import { DeliveryJackets } from '../entities/DeliveryJackets';
import { DeliveryBags } from '../entities/DeliveryBags';
import { Aggregator } from '../entities/Aggregator';
import { RequestLog } from '../entities/RequestLogs';

@Module({
    imports: [
        RabbitmqModule,
        TypeOrmModule.forFeature([
            TransportType,
            Transport,
            Order,
            EmployeeAggregator,
            Employee,
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
        EmployeeAggregatorService,
        EmployeeService,
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
