import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty } from 'class-validator';
import { Couriers } from '../../entities/Couriers';
import { ApiProperty } from '@nestjs/swagger';
import {Transport} from "../../entities/Transport";

export class CreateCourierShiftsDto extends CreateHandbookDto {
    @IsNotEmpty()
    couriers: Couriers;

    @IsNotEmpty()
    transport: Transport;

    @IsNotEmpty()
    vehicle_number: string;

    @IsNotEmpty()
    bag_number: string;

    @ApiProperty()
    closed_at: number;
}

