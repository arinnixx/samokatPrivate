import { Module } from '@nestjs/common';
import { PassportService } from './passport.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { Passport } from '../entities/Passport';
import { PassportController } from './passport.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Passport]),
        RabbitmqModule,
    ],
    controllers: [PassportController],
    providers: [PassportService, RabbitmqService],
    exports: [PassportService],
})
export class PassportModule {
}
