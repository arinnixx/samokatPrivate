import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class CreateEmployeeDto extends CreateHandbookDto {
    @IsNotEmpty()
    fio: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @MaxLength(11)
    @IsNotEmpty()
    snils: string;

    @MaxLength(10)
    @IsNotEmpty()
    inn: string;

}
