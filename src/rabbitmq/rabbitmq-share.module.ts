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
import { DeliveryStatusService } from '../delivery-status/delivery-status.service';
import { DeliveryJacketsService } from '../delivery-jackets/delivery-jackets.service';
import { DeliveryBagsService } from '../delivery-bags/delivery-bags.service';
import { AggregatorService } from '../aggregator/aggregator.service';

@Module({
    imports: [
        RabbitmqModule,
    ],
    controllers: [RabbitmqController],
    providers: [RabbitmqService,TransportTypesService,TransportService,RequestLogsService,OrdersService,EmployeeAggregatorService,EmployeeService,DeliveryStatusHistoryService,DeliveryStatusService,DeliveryJacketsService,DeliveryBagsService,AggregatorService,],
    exports: [RabbitmqService],
})
export class RabbitmqShareModule {
}
