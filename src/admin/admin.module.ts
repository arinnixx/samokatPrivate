import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from '../entities/Admin';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { TokenModule } from '../token/token.module';
import { AdminController } from './admin.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Admin]),
        RabbitmqModule,
        TokenModule,
    ],
    controllers: [AdminController],
    providers: [AdminService, RabbitmqService],
    exports: [AdminService],
})
export class AdminModule {
}
