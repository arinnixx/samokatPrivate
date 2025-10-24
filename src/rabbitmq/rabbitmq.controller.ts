import {Injectable} from '@nestjs/common';
import {RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";
import { config } from '../utils';

@Injectable()
export class RabbitmqController {
  constructor(

  ) {
  }
  @RabbitSubscribe({
    queue: config.RMQ_QUEUE_PRIVATE ?? process.env.RMQ_QUEUE_PRIVATE,
  })

  async handleMessage(payload: any) {
    console.log(payload)

  }

}
