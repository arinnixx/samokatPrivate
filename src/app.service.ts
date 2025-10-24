import { Injectable } from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class AppService {
  constructor(
      private readonly rabbitMQService: AmqpConnection,
  ) {
  }


  getHello(): string {
    return 'Hello World!';
  }
}
