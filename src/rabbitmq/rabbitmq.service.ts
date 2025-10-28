import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import * as process from 'node:process';

@Injectable()
export class RabbitmqService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
    ) {
    }

    async publish(data: any) {
        return await this.amqpConnection.publish('', process.env.RMQ_QUEUE_AGGREGATOR, data);
    }
}
