import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Admin} from "../entities/Admin";

@Module({
  imports: [
    TypeOrmModule.forFeature([Aggregator, Admin]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
