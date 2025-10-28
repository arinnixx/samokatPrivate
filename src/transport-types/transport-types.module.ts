import {Module} from '@nestjs/common';
import {TransportTypesService} from './transport-types.service';
import {TransportTypesController} from './transport-types.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TransportType} from "../entities/TransportTypes";

@Module({
    imports: [
        TypeOrmModule.forFeature([TransportType]),
    ],
    controllers: [TransportTypesController],
    providers: [TransportTypesService],
    exports: [TransportTypesService],
})
export class TransportTypesModule {
}
