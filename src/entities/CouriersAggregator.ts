import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Couriers } from './Couriers';
import { Aggregator } from './Aggregator';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'employee_aggregator', comment: 'Связь сотрудника и агрегатора' })
export class CouriersAggregator extends BaseEntity {

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'employee_id' })
    employee: Couriers;

    @ManyToOne(() => Aggregator)
    @JoinColumn({ name: 'aggregator_id' })
    aggregator: Aggregator;

    @Column({ type: 'bigint', comment: 'Дата начала работы' })
    start_date: number;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата окончания работы' })
    end_date: number;

    @Column({ comment: 'Табельный номер' })
    personnel_number: string;

    @BeforeInsert()
    setStart_date() {
        this.start_date = Math.floor(Date.now() / 1000);
    }
}