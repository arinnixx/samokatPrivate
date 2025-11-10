import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { StatusType } from './StatusType';
import { Order } from './Orders';

@Entity({ name: 'delivery-status-history', comment: 'Сотрудник' })
export class DeliveryStatusHistory extends BaseEntity {

    @ManyToOne(() => StatusType)
    @JoinColumn({ name: 'status_id' })
    status: StatusType;

    @ManyToOne(() => Order)
    @JoinColumn({ name: 'order_id' })
    order: Order;

}
