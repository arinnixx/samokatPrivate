import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetAggregatorPasswordDto {
    @ApiProperty({ example: 'newPassword123', description: 'Новый пароль' })
    @IsString()
    @IsNotEmpty({ message: 'Новый пароль не может быть пустым' })
    @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
    newPassword: string;
}