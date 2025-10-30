import { CreateHandbookDto } from '../../base/dto/base.dto';
import { IsNotEmpty } from 'class-validator';

export class CreateAggregatorDto extends CreateHandbookDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    token: string;
}
