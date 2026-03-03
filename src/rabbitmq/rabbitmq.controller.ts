import { Controller, Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { config } from '../utils';
import { RequestLogsService } from '../request-logs/request-logs.service';
import { StatusesService } from '../statuses/statuses.service';
import { AggregatorService } from '../aggregator/aggregator.service';
import { CouriersService } from '../couriers/couriers.service';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
import { ViolationsTypeService } from '../violations-type/violations-type.service';
import { CourierShiftsService } from '../courier-shifts/courier-shifts.service';
import { CourierViolationsService } from '../courier-violations/courier-violations.service';
import { AdminService} from "../admin/admin.service";

@Controller()
@Injectable()
export class RabbitmqController {
    config = {};

    constructor(
        private requestLogsService: RequestLogsService,
        private couriersAggregatorService: CouriersAggregatorService,
        private couriersService: CouriersService,
        private statusesService: StatusesService,
        private aggregatorService: AggregatorService,
        private violationsTypeService: ViolationsTypeService,
        private courierShiftsService: CourierShiftsService,
        private courierViolationsService: CourierViolationsService,
        private adminService: AdminService,
    ) {
        this.config['couriers-aggregator'] = this.couriersAggregatorService;
        this.config['couriers'] = this.couriersService;
        this.config['statuses'] = this.statusesService;
        this.config['aggregator'] = this.aggregatorService;
        this.config['violations-type'] = this.violationsTypeService;
        this.config['courier-shifts'] = this.courierShiftsService;
        this.config['courier-violations'] = this.courierViolationsService;
        this.config['admin'] = this.adminService;
    }

    @RabbitSubscribe({
        queue: config.RMQ_QUEUE_PRIVATE ?? process.env.RMQ_QUEUE_PRIVATE,
    })
    async handleMessage(payload: any) {
        try {
            await this.requestLogsService.createItem({
                request_data: {
                    ...payload,
                },
            }, null);
        } catch (logError) {
            console.error('Ошибка при записи лога:', logError);
        }

        const service = this.config[payload.name];
        const adminRoute = ['statuses', 'aggregator', 'violations-type','admin'].includes(payload.name);

        if (service) {
            switch (payload.method) {
                case 'POST':
                    if (adminRoute) {
                        service.createItem(payload.data, true);
                    } else {
                        service.createItem(payload.data, payload.aggregator);
                    }
                    break;
                case 'PATCH':
                    if (adminRoute) {
                        service.updateBy({ id: payload.id }, payload.data, true);
                    } else {
                        service.updateBy({ id: payload.id }, payload.data, payload.aggregator);
                    }
                    break;
                case 'DELETE':
                    if (adminRoute) {
                        service.remove(payload.id, true);
                    } else {
                        service.remove(payload.id, payload.aggregator);
                    }
                    break;
                default:
                    console.error('нет такого метода....', payload);
                    break;
            }
        }
    }
}
