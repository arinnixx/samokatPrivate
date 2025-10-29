import { Module } from '@nestjs/common';
import { TransportService } from './transport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transport } from '../entities/Transport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Transport]),
    ],
    controllers: [],
    providers: [TransportService],
    exports: [TransportService],
})
export class TransportModule {
}
