import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ToggleBlockDto {
    @ApiProperty({ example: true, description: 'Заблокировать (true) или разблокировать (false)' })
    @IsBoolean()
    isBlocked: boolean;
}