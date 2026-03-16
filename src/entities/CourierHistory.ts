import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('courier_history')
export class CourierHistory extends BaseEntity {
    @Column({ name: 'courier_id' })
    courierId: number;

    @Column({ type: 'jsonb', comment: 'Данные курьера до изменения' })
    data: any;

    @Column({ length: 10, comment: 'Тип операции: UPDATE, DELETE' })
    action: string;

    @Column({ type: 'bigint', comment: 'Время изменения' })
    changedAt: number;

}