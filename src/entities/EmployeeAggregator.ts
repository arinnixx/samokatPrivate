import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Employee} from './Employee';
import {Aggregator} from './Aggregator';
import {BaseEntity} from '../base/base.entity';

@Entity({name: 'employee_aggregator', comment: 'Связь сотрудника и агрегатора'})
export class EmployeeAggregator extends BaseEntity {

    @ManyToOne(() => Employee)
    @JoinColumn({name: 'employee_id'})
    employee: Employee;

    @ManyToOne(() => Aggregator)
    @JoinColumn({name: 'aggregator_id'})
    aggregator: Aggregator;

    @Column({type: 'bigint', comment: 'Дата начала работы'})
    start_date: number;

    @Column({type: 'bigint', nullable: true, comment: 'Дата окончания работы'})
    end_date: number;

    @Column({comment: 'Табельный номер'})
    personnel_number: string;
}