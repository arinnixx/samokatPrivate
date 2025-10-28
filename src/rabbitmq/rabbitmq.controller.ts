import {Injectable} from '@nestjs/common';
import {RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import { config } from '../utils';
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

@Injectable()
export class RabbitmqController {
  config = {};

  constructor(
      private transportTypeService: TransportTypesService,
      private transportService: TransportService,
      private requestLogsService:RequestLogsService,
      private ordersService:OrdersService,
      private employeeAggregatorService: EmployeeAggregatorService,
      private employeeService:EmployeeService,
      private deliveryStatusHistoryService:DeliveryStatusHistoryService,
      private deliveryStatusService:DeliveryStatusService,
      private deliveryJacketsService:DeliveryJacketsService,
      private deliveryBagsService:DeliveryBagsService,
      private aggregatorService:AggregatorService
  ) {
    this.config['transport-types'] = this.transportTypeService;
    this.config['transport'] = this.transportService;
    this.config['request-logs'] = this.requestLogsService;
    this.config['orders'] = this.ordersService;
    this.config['employee-aggregator'] = this.employeeAggregatorService;
    this.config['employee'] = this.employeeService;
    this.config['delivery-status-history'] = this.deliveryStatusHistoryService;
    this.config['delivery-status'] = this.deliveryStatusService;
    this.config['delivery-jackets'] = this.deliveryJacketsService;
    this.config['delivery-bags'] = this.deliveryBagsService;
    this.config['aggregator'] = this.aggregatorService;
  }

  @RabbitSubscribe({
    queue: config.RMQ_QUEUE_PRIVATE ?? process.env.RMQ_QUEUE_PRIVATE,
  })

  async handleMessage(payload: any) {
    const service = this.config[payload.name];
    console.log(payload);
    if (service) {
      switch (payload.method) {
        case 'POST':
          service.create(payload.data);
          break;
        case 'PATCH':
          service.update(payload.id, payload.data);
          break;
        case 'DELETE':
          service.remove(payload.id);
          break;
        default :
          console.error("нет такого метода....",payload);
          break;
      }
    }

  }



}
