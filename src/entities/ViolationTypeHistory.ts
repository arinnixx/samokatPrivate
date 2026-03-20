import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity('violations_type_history')
export class ViolationsTypeHistory extends BaseEntity {
    @Column({ name: 'violation_type_id' })
    violationTypeId: number;

    @Column({ type: 'jsonb', comment: 'Данные типа нарушения до изменения' })
    data: any;

    @Column({ length: 10, comment: 'Тип операции: UPDATE, DELETE' })
    action: string;

    @Column({ type: 'bigint', comment: 'Время изменения' })
    changedAt: number;
}