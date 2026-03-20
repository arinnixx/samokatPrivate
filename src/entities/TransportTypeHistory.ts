import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('transport_type_history')
export class TransportTypeHistory extends BaseEntity {
    @Column({ name: 'transport_type_id' })
    transportTypeId: number;

    @Column({ type: 'jsonb', comment: 'Данные типа транспорта до изменения' })
    data: any;

    @Column({ length: 10, comment: 'Тип операции: UPDATE, DELETE' })
    action: string;

    @Column({ type: 'bigint', comment: 'Время изменения' })
    changedAt: number;
}