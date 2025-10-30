import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateTransportTypeDto extends CreateHandbookDto {

    @IsNotEmpty()
    name: string;
}
