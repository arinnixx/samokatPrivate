import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTransportObdiiDto {
    @ApiProperty({ example: 1, description: 'ID нового OBDII устройства' })
    @IsNotEmpty()
    @IsNumber()
    obdiiId: number;
}