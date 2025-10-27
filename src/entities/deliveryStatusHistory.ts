import {Entity, JoinColumn, ManyToOne} from 'typeorm';
import {BaseEntity} from '../base/base.entity';
import {DeliveryStatus} from "./DeliveryStatus";
import {Order} from "./Orders";

@Entity({name: 'delivery-status-history', comment: 'Сотрудник'})
export class DeliveryStatusHistory extends BaseEntity {

    @ManyToOne(() => DeliveryStatus)
    @JoinColumn({name: 'status_id'})
    status: DeliveryStatus;

    @ManyToOne(() => Order)
    @JoinColumn({name: 'order_id'})
    order: Order;

}
