import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('order_history')
export class OrderHistory extends BaseEntity {
    @Column({ name: 'order_id' })
    orderId: number;

    @Column({ type: 'jsonb', comment: 'Данные смены до изменения' })
    data: any;

    @Column({ length: 10, comment: 'Тип операции: UPDATE, DELETE' })
    action: string;

    @Column({ type: 'bigint', comment: 'Время изменения' })
    changedAt: number;

}