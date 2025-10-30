import { CreateHandbookDto } from '../../base/dto/base.dto';
import { TransportType } from '../../entities/TransportTypes';
import { Aggregator } from '../../entities/Aggregator';
import { IsNotEmpty } from 'class-validator';

export class CreateTransportDto extends CreateHandbookDto {

    @IsNotEmpty()
    type: TransportType;

    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    aggregator: Aggregator;
}

