import { CreateHandbookDto } from '../../base/dto/base.dto';
import {IsNotEmpty, IsOptional, IsString, ValidateNested} from 'class-validator';
import { Couriers } from '../../entities/Couriers';
import { ViolationsType } from '../../entities/ViolationType';
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

class GeoJSONPointDto {
    @ApiProperty({ example: 'Point' })
    @IsString()
    type: string;

    @ApiProperty({ example: [37.6173, 55.7558] })
    @IsNotEmpty()
    coordinates: [number, number];
}

export class CreateCourierViolationsDto extends CreateHandbookDto {
    @IsNotEmpty()
    couriers: Couriers;

    @IsNotEmpty()
    violation_date: number;

    @IsNotEmpty()
    violation_type: ViolationsType;

    @IsNotEmpty()
    incident_details: string;

    @IsNotEmpty()
    operator_comment: string;

    @ApiProperty({ required: false, description: 'Координаты нарушения' })
    @IsOptional()
    @ValidateNested()
    @Type(() => GeoJSONPointDto)
    location?: GeoJSONPointDto;
}
