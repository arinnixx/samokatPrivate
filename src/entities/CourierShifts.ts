import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Couriers } from './Couriers';

export enum Movement {
    auto = 'Авто',
    people = 'Пеший',
    velo = 'Вело',
    moto = 'Мото',
    elvelo = 'Электровело'
}

@Entity({ name: 'courier_shift', comment: 'Средства передвижения' })
export class CourierShift extends BaseEntity {

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'courier_id' })
    couriers: Couriers;

    @Column({ comment: 'Тип передвижения', type: 'enum', enum: Movement })
    movement_type: Movement;

    @Column({ comment: 'Номер ТС' })
    vehicle_number: string;

    @Column({ comment: 'Номер сумки' })
    bag_number: string;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата' })
    closed_at: number;
}
