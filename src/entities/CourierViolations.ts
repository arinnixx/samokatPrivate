import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TransportType } from './TransportTypes';
import { Couriers } from './Couriers';
import { ViolationsType } from './ViolationType';

@Entity({ name: 'courier_violations', comment: 'Агрегатор' })
export class CourierViolations extends BaseEntity {

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'courier_id' })
    couriers: Couriers;

    @Column({ comment: 'Код' })
    violation_date: number;

    @ManyToOne(() => ViolationsType)
    @JoinColumn({ name: 'violation_type' })
    violation_type: ViolationsType;

    @Column({ comment: 'Описание нарушения' })
    incident_details: string;

    @Column({ comment: 'Комментарий оператора' })
    operator_comment: string;
}
