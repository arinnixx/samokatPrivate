import { CreateHandbookDto } from '../../base/dto/base.dto';
import { StatusType } from '../../entities/StatusType';
import { Order } from '../../entities/Orders';
import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryStatusHistoryDto extends CreateHandbookDto {
    @IsNotEmpty()
    status: StatusType;
    @IsNotEmpty()
    order: Order;
}
