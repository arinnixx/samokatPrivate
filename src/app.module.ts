import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {RabbitMQModule} from '@golevelup/nestjs-rabbitmq';
import {RabbitmqController} from "./rabbitmq/rabbitmq.controller";
import {RabbitmqService} from "./rabbitmq/rabbitmq.service";

@Module({
    imports: [
        RabbitMQModule.forRootAsync({
            useFactory: () => ({
                queues: [
                    {
                        name: process.env.RMQ_QUEUE_PRIVATE ?? 'to_private',
                        options: {
                            durable: true,
                        },
                    },
                ],
                connectionInitOptions: {
                    wait: false,
                },
                channels: {
                    default: {
                        default: true,
                        prefetchCount: 1,
                    },
                },
                uri: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_URL}`,
                enableControllerDiscovery: true,
            }),
        }),],
    controllers: [AppController,],
    providers: [AppService, RabbitmqController, RabbitmqService],
})
export class AppModule {
}
