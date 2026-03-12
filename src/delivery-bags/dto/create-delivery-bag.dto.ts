import { CreateHandbookDto } from '../../base/dto/base.dto';
import { Aggregator } from '../../entities/Aggregator';
import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryBagDto extends CreateHandbookDto {
    @IsNotEmpty()
    code: string;
}
