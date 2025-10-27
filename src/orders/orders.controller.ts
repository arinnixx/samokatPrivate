import {Controller, UsePipes, ValidationPipe} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {CreateOrderDto} from './dto/create-order.dto';
import {UpdateOrderDto} from './dto/update-order.dto';
import {BaseController} from "../base/base.controller";
import {Order} from "../entities/Orders";

@Controller('orders')
@UsePipes(new ValidationPipe({transform: true}))
export class OrdersController extends BaseController<OrdersService, Order, CreateOrderDto, UpdateOrderDto> {
    constructor(
        service: OrdersService
    ) {
        super(service)
    }
}
