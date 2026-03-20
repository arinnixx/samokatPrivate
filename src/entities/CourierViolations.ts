import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Couriers } from './Couriers';
import { ViolationsType } from './ViolationType';

@Entity({ name: 'courier_violations', comment: 'Нарушения курьера' })
export class CourierViolations extends BaseEntity {

    @Column({ name: 'courier_id', nullable: true })
    courier_id: number;

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'courier_id' })
    couriers: Couriers;

    @Column({ type: 'bigint', comment: 'Код' })
    violation_date: number;

    @Column({ name: 'violation_type_id', nullable: true })
    violation_type_id: number;

    @ManyToOne(() => ViolationsType)
    @JoinColumn({ name: 'violation_type_id' })
    violation_type: ViolationsType;

    @Column({ comment: 'Описание нарушения' })
    incident_details: string;

    @Column({ comment: 'Комментарий оператора' })
    operator_comment: string;

    @Column({ type: 'jsonb', nullable: true, comment: 'Координаты нарушения' })
    location: any;

}