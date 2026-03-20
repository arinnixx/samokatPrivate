import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('statuses_history')
export class StatusesHistory extends BaseEntity {
    @Column({ name: 'status_id' })
    statusId: number;

    @Column({ type: 'jsonb', comment: 'Данные статуса до изменения' })
    data: any;

    @Column({ length: 10, comment: 'Тип операции: UPDATE, DELETE' })
    action: string;

    @Column({ type: 'bigint', comment: 'Время изменения' })
    changedAt: number;
}