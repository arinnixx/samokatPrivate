import { Module } from '@nestjs/common';
import { DriverLicenseService } from './driverLicense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { DriverLicense } from '../entities/DriverLicense';
import { DriverLicenseController } from './driver-license.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([DriverLicense]),
        RabbitmqModule,
    ],
    controllers: [DriverLicenseController],
    providers: [DriverLicenseService, RabbitmqService],
    exports: [DriverLicenseService],
})
export class DriverLicenseModule {
}
