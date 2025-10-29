import { Module } from '@nestjs/common';
import { DeliveryJacketsService } from './delivery-jackets.service';
import { DeliveryJackets } from '../entities/DeliveryJackets';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([DeliveryJackets]),
    ],
    controllers: [],
    providers: [DeliveryJacketsService],
    exports: [DeliveryJacketsService],
})
export class DeliveryJacketsModule {
}
