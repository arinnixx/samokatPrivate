import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator';

export class CreateCouriersDto extends CreateHandbookDto {
    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    middleName: string;

    @IsNotEmpty()
    gender: string;

    @IsNotEmpty()
    citizenship: string;

    @IsNotEmpty()
    birthDate: string;

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
