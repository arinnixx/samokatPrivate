import {Module} from '@nestjs/common';
import {DeliveryBagsService} from './delivery-bags.service';
import {DeliveryBagsController} from './delivery-bags.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {DeliveryBags} from "../entities/DeliveryBags";
import {Aggregator} from "../entities/Aggregator";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryBags, Aggregator]),
    ],
    controllers: [DeliveryBagsController],
    providers: [DeliveryBagsService],
})
export class DeliveryBagsModule {
}
