import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateObdiiDto {
    @ApiProperty({ example: 'ABC123', description: 'Уникальный идентификатор устройства' })
    @IsNotEmpty()
    @IsString()
    uid: string;
}