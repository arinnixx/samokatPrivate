import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

class PassportDto {
    @IsNotEmpty()
    @IsString()
    series: string;

    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsString()
    issueDate: string;

    @IsNotEmpty()
    @IsString()
    issuedBy: string;

    @IsNotEmpty()
    @IsString()
    birthPlace: string;

    @IsNotEmpty()
    @IsString()
    registrationAddress: string;

    @IsOptional()
    @IsString()
    residenceAddress?: string;
}

class DriverLicenseExperienceDto {
    @IsNotEmpty()
    startYear: number;
}

class DriverLicenseDto {
    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    series: string;

    @IsNotEmpty()
    @IsString()
    number: string;

    @IsNotEmpty()
    @IsString()
    issueDate: string;


    @IsNotEmpty()
    @IsString()
    expiryDate: string;

    @IsNotEmpty()
    experience: DriverLicenseExperienceDto;
}

export class CreateCourierDto {
    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    middleName?: string;

    @IsNotEmpty()
    @IsString()
    birthDate: string;

    @IsNotEmpty()
    @Matches(/^\+7\d{10}$/, { message: 'Phone must be in format +7XXXXXXXXXX' })
    phone: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsIn(['M', 'F'])
    gender?: string;

    @IsOptional()
    @IsString()
    inn?: string;

    @IsOptional()
    @IsString()
    citizenship?: string;

    @IsNotEmpty()
    passport: PassportDto;

    @IsOptional()
    @IsString()
    snils?: string;

    @IsNotEmpty()
    driverLicense: DriverLicenseDto;
}