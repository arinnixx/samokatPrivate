import { Controller, Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { config } from '../utils';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { TransportService } from '../transport/transport.service';
import { RequestLogsService } from '../request-logs/request-logs.service';
import { OrdersService } from '../orders/orders.service';
import { StatusTypeService } from '../status-type/status-type.service';
import { DeliveryJacketsService } from '../delivery-jackets/delivery-jackets.service';
import { DeliveryBagsService } from '../delivery-bags/delivery-bags.service';
import { AggregatorService } from '../aggregator/aggregator.service';
import { CouriersService } from '../couriers/couriers.service';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';

@Controller()
@Injectable()
export class RabbitmqController {
    config = {};

    constructor(
        private transportTypeService: TransportTypesService,
        private transportService: TransportService,
        private requestLogsService: RequestLogsService,
        private ordersService: OrdersService,
        private employeeAggregatorService: CouriersAggregatorService,
        private employeeService: CouriersService,
        private statusTypeService: StatusTypeService,
        private deliveryJacketsService: DeliveryJacketsService,
        private deliveryBagsService: DeliveryBagsService,
        private aggregatorService: AggregatorService,
    ) {
        this.config['transport-types'] = this.transportTypeService;
        this.config['transport'] = this.transportService;
        this.config['orders'] = this.ordersService;
        this.config['employee-aggregator'] = this.employeeAggregatorService;
        this.config['employee'] = this.employeeService;
        this.config['status-type'] = this.statusTypeService;
        this.config['delivery-jackets'] = this.deliveryJacketsService;
        this.config['delivery-bags'] = this.deliveryBagsService;
        this.config['aggregator'] = this.aggregatorService;
    }

    @RabbitSubscribe({
        queue: config.RMQ_QUEUE_PRIVATE ?? process.env.RMQ_QUEUE_PRIVATE,
    })
    async handleMessage(payload: any) {
        try {
            await this.requestLogsService.createItem(null, {
                request_data: {
                    ...payload,
                },
            });
        } catch (logError) {
            console.error('Ошибка при записи лога:', logError);
        }

        const service = this.config[payload.name];
        const adminRoute = ['transport-types', 'status-type', 'aggregator'].includes(payload.name);

        if (service) {
            switch (payload.method) {
                case 'POST':
                    if (adminRoute) {
                        service.createItem(payload.data, true);
                    } else {
                        service.create(payload.aggregator, payload.data);
                    }
                    break;
                case 'PATCH':
                    if (adminRoute) {
                        service.updateBy({ id: payload.id }, payload.data, true);
                    } else {
                        service.updateBy(payload.aggregator, { id: payload.id }, payload.data);
                    }
                    break;
                case 'DELETE':
                    if (adminRoute) {
                        service.remove(payload.id, true);
                    } else {
                        service.remove(payload.aggregator, payload.id);
                    }
                    break;
                default:
                    console.error('нет такого метода....', payload);
                    break;
            }
        }
    }

}
