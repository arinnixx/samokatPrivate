import {Module} from '@nestjs/common';
import {DeliveryJacketsService} from './delivery-jackets.service';
import {DeliveryJacketsController} from './delivery-jackets.controller';
import {DeliveryJackets} from "../entities/DeliveryJackets";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryJackets]),
    ],
    controllers: [DeliveryJacketsController],
    providers: [DeliveryJacketsService],
    exports:[DeliveryJacketsService],
})
export class DeliveryJacketsModule {
}
