import {Injectable} from '@nestjs/common';
import {RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import { config } from '../utils';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { TransportService } from '../transport/transport.service';

@Injectable()
export class RabbitmqController {
  config = {};

  constructor(
      private transportTypeService: TransportTypesService,
      private transportService: TransportService,
  ) {
    this.config['transport-types'] = this.transportTypeService;
    this.config['transport'] = this.transportService;
  }

  @RabbitSubscribe({
    queue: config.RMQ_QUEUE_PRIVATE ?? process.env.RMQ_QUEUE_PRIVATE,
  })

  async handleMessage(payload: any) {
    const service = this.config[payload.name];
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
      }
    }

  }



}
