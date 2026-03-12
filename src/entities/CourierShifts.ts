import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Couriers } from './Couriers';
import {Transport} from "./Transport";

@Entity({ name: 'courier_shift', comment: 'Средства передвижения' })
export class CourierShift extends BaseEntity {

    @Column({ name: 'courier_id', nullable: true })
    courier_id: number;

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'courier_id' })
    couriers: Couriers;

    @Column({ name: 'transport_id', nullable: true })
    transport_id: number;

    @ManyToOne(() => Transport)
    @JoinColumn({ name: 'transport_id' })
    transport: Transport;

    @Column({ comment: 'Номер ТС' })
    vehicle_number: string;

    @Column({ comment: 'Номер сумки' })
    bag_number: string;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата' })
    closed_at: number;
}