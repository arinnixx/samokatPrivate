import { CreateHandbookDto } from '../../base/dto/base.dto';
import { DeliveryStatus } from '../../entities/DeliveryStatus';
import { Order } from '../../entities/Orders';
import { IsNotEmpty } from 'class-validator';

export class CreateDeliveryStatusHistoryDto extends CreateHandbookDto {
    @IsNotEmpty()
    status: DeliveryStatus;
    @IsNotEmpty()
    order: Order;
}
