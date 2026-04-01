import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Couriers } from './Couriers';
import { Aggregator } from './Aggregator';
import { Transport} from "./Transport";
import { Statuses } from './Statuses';
import { BaseEntity } from '../base/base.entity';
import {DeliveryBags} from "./DeliveryBags";
import {DeliveryJackets} from "./DeliveryJackets";
import {ApiProperty} from "@nestjs/swagger";
import {Exclude} from "class-transformer";

@Entity({ name: 'orders', comment: 'Заказы' })
export class Order extends BaseEntity {

    @Column({ name: 'aggregator_id', nullable: true })
    aggregator_id: number;

    @ManyToOne(() => Aggregator)
    @JoinColumn({ name: 'aggregator_id' })
    aggregator: Aggregator;

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

    @Column({ name: 'bag_id', nullable: true })
    bag_id: number;

    @ManyToOne(() => DeliveryBags)
    @JoinColumn({ name: 'bag_id',  })
    delivery_bags: DeliveryBags;

    @Column({ name: 'jacket_id', nullable: true })
    jacket_id: number;

    @ManyToOne(() => DeliveryJackets)
    @JoinColumn({ name: 'jacket_id' })
    delivery_jackets: DeliveryJackets;

    @Column({ type: 'bigint', comment: 'Дата начала' })
    start_date: number;

    @Column({ type: 'bigint', nullable: true, comment: 'Дата окончания' })
    end_date: number;

    @Column({ name: 'status_id', nullable: true })
    status_id: number;


    @ManyToOne(() => Statuses)
    @JoinColumn({ name: 'status_id' })
    statuses: Statuses;

    @Column({ name: 'route', type: 'json', nullable: true, comment: 'Маршрут (массив)' })
    route: JSON[];
}