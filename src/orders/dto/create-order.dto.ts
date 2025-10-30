import { Transform } from 'class-transformer';
import { CreateHandbookDto } from '../../base/dto/base.dto';

export class CreateOrderDto extends CreateHandbookDto {
    @Transform(({ value }) => ({ id: value }))
    aggregator_id: number;

    @Transform(({ value }) => ({ id: value }))
    employee_id: number;

    @Transform(({ value }) => ({ id: value }))
    transport_id: number;

    @Transform(({ value }) => ({ id: value }))
    status_id: number;

    start_date: number;
    end_date?: number;
    route: any[];
}