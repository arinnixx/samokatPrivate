import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TransportType } from './TransportTypes';
import { Aggregator } from './Aggregator';
import { BaseEntity } from '../base/base.entity';
import { Couriers } from './Couriers';
import { Transport } from './Transport';
import { ApiProperty } from '@nestjs/swagger';

export enum  Movement {
    auto= "Авто",
    people = "Пеший",
    velo = 'Вело',
    moto = 'Мото',
    elvelo = 'Электровело'
}
@Entity({ name: 'transport', comment: 'Средства передвижения' })
export class CourierShift extends BaseEntity {

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'courier_id' })
    courier: Couriers;

    @Column({ comment: 'Код',type:'enum', enum: Movement })
    movement_type: Movement;

    @Column({ comment: 'Тип передвижения' })
    vehicle_number: string;

    @Column({ comment: 'Номер сумки' })
    bag_number: string;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата ' })
    closed_at: number;
}
