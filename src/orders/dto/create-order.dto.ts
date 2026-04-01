import { Transform } from 'class-transformer';
import { CreateHandbookDto } from '../../base/dto/base.dto';
import {IsEmpty, IsNotEmpty, IsOptional} from "class-validator";
import {Couriers} from "../../entities/Couriers";
import {Transport} from "../../entities/Transport";
import {Statuses} from "../../entities/Statuses";
import {DeliveryBags} from "../../entities/DeliveryBags";
import {DeliveryJackets} from "../../entities/DeliveryJackets";

export class CreateOrderDto extends CreateHandbookDto {

    @IsNotEmpty()
    couriers: Couriers;

    @IsNotEmpty()
    transport: Transport;

    @IsNotEmpty()
    statuses: Statuses;

    @IsEmpty()
    delivery_bags: DeliveryBags;

    @IsEmpty()
    delivery_jackets: DeliveryJackets;

    @IsNotEmpty()
    start_date: any;

    @IsEmpty()
    end_date?: any;

    @IsEmpty()
    route: any[];
}