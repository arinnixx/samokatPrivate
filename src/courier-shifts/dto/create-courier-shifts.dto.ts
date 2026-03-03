import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty } from 'class-validator';
import { Couriers } from '../../entities/Couriers';
import { Movement } from '../../entities/CourierShifts';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourierShiftsDto extends CreateHandbookDto {
    @IsNotEmpty()
    couriers: Couriers;

    @IsNotEmpty()
    movement_type: Movement;

    @IsNotEmpty()
    vehicle_number: string;

    @IsNotEmpty()
    bag_number: string;

    @ApiProperty()
    closed_at: number;
}
