import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({example: 'aggregator1', description: 'Логин агрегатора'})
    @IsString()
    @IsNotEmpty({message: 'Логин не может быть пустым'})
    login: string;

    @ApiProperty({ example: 'password123', description: 'Пароль агрегатора' })
    @IsString()
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
    password: string;
}