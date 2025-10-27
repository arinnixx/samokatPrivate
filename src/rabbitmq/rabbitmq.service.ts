import {Injectable} from '@nestjs/common';
import {AmqpConnection} from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class RabbitmqService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
    ) {
        this.test()
    }

    async test() {
        await this.amqpConnection.publish('', 'to_aggregator', {test: 5});
    }
}
