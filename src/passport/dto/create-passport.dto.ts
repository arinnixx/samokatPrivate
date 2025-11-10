import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreatePassportDto extends CreateHandbookDto {
    @IsNotEmpty()
    @MaxLength(4)
    series: string;

    @IsNotEmpty()
    @MaxLength(6)
    number: string;

    @IsNotEmpty()
    issueDate: string;

    @IsNotEmpty()
    issuedBy: string;

    @IsNotEmpty()
    birthPlace: string;

    @IsNotEmpty()
    registrationAddress: string;

    @IsNotEmpty()
    residenceAddress: string;

}
