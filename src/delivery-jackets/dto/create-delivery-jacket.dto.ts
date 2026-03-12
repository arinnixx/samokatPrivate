import { CreateHandbookDto } from '../../base/dto/base.dto';
import { Aggregator } from '../../entities/Aggregator';
import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryJacketDto extends CreateHandbookDto {
    @IsNotEmpty()
    code: string;
}
