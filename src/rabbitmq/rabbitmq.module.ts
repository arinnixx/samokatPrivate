import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

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
                        prefetchCount: 10,
                    },
                },
                uri: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASSWORD}@${process.env.RMQ_URL}`,
                enableControllerDiscovery: true,
            }),
        }),
    ],
    exports: [RabbitMQModule],
})
export class RabbitmqModule {
}
