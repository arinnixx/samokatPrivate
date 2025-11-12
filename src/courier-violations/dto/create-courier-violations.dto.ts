import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty } from 'class-validator';
import { Couriers } from '../../entities/Couriers';
import { ViolationsType } from '../../entities/ViolationType';

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
}
