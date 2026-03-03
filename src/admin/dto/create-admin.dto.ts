import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {

    @ApiProperty({ example: 'admin_login', description: 'Логин для входа', required: false })
    @IsString()
    @IsOptional()
    login?: string;

    @ApiProperty({ example: 'secure_password', description: 'Пароль для входа', required: false })
    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
    password?: string;
}
