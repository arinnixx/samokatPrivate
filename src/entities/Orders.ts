import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Employee } from './Employee';
import { Aggregator } from './Aggregator';
import { Transport } from './Transport';
import { StatusType } from './StatusType';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'orders', comment: 'Заказы' })
export class Order extends BaseEntity {

    @ManyToOne(() => Aggregator)
    @JoinColumn({ name: 'aggregator_id' })
    aggregator: Aggregator;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'employee_id' })
    employee: Employee;

    @ManyToOne(() => Transport)
    @JoinColumn({ name: 'transport_id' })
    transport: Transport;

    @Column({ type: 'bigint', comment: 'Дата начала' })
    start_date: number;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата окончания' })
    end_date: number;

    @ManyToOne(() => StatusType)
    @JoinColumn({ name: 'status_id' })
    status: StatusType;

    @Column({ type: 'json', comment: 'Маршрут (массив)' })
    route: JSON[];
}