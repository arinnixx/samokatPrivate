import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDriverLicenseDto extends CreateHandbookDto {
    @IsNotEmpty()
    @MaxLength(2)
    series: string;

    @MaxLength(6)
    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    country: string;

    @MaxLength(11)
    @IsNotEmpty()
    issueDate: string;

    @IsNotEmpty()
    expiryDate: string;

    @IsNotEmpty()
    experience_startYear: string;

}
