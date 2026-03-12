import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Couriers } from './Couriers';
import { Aggregator } from './Aggregator';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'couriers_aggregator', comment: 'Связь сотрудника и агрегатора' })
export class CouriersAggregator extends BaseEntity {

    @Column({ type: 'bigint', comment: 'Дата начала работы' })
    start_date: number;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата окончания работы' })
    end_date: number;

    @Column({ name: 'couriers_id', nullable: true })
    couriers_id: number;

    @Column({ name: 'aggregator_id', nullable: true })
    aggregator_id: number;

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'couriers_id' })
    couriers: Couriers;

    @ManyToOne(() => Aggregator)
    @JoinColumn({ name: 'aggregator_id' })
    aggregator: Aggregator;

    @BeforeInsert()
    setStart_date() {
        this.start_date = Math.floor(Date.now() / 1000);
    }
}