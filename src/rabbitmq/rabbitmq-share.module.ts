import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { RabbitmqModule } from './rabbitmq.module';
import { TransportTypesService } from '../transport-types/transport-types.service';
import { TransportService } from '../transport/transport.service';

@Module({
    imports: [
        RabbitmqModule,
    ],
    controllers: [RabbitmqController],
    providers: [RabbitmqService,TransportTypesService,TransportService],
    exports: [RabbitmqService],
})
export class RabbitmqShareModule {
}
