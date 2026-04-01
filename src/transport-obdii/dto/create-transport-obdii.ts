import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransportObdiiDto {
    @ApiProperty({ example: 1, description: 'ID транспорта' })
    @IsNotEmpty()
    @IsNumber()
    transportId: number;

    @ApiProperty({ example: 1, description: 'ID OBDII устройства' })
    @IsNotEmpty()
    @IsNumber()
    obdiiId: number;
}