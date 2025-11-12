import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class CreateCouriersDto extends CreateHandbookDto {
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    middleName: string;

    gender: string;

    citizenship: string;

    @IsNotEmpty()
    birthDate: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @MaxLength(11)
    snils: string;

    @MaxLength(10)
    inn: string;

}
