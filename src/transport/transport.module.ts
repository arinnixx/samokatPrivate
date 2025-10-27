import {Module} from '@nestjs/common';
import {TransportService} from './transport.service';
import {TransportController} from './transport.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Transport} from "../entities/Transport";

@Module({
    imports: [
        TypeOrmModule.forFeature([Transport]),
    ],
    controllers: [TransportController],
    providers: [TransportService],
})
export class TransportModule {
}
