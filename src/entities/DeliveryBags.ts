import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Aggregator} from "./Aggregator";
import {BaseEntity} from '../base/base.entity';

@Entity({name: 'delivery-bags', comment: 'Сумки'})
export class DeliveryBags extends BaseEntity {

    @Column({comment: 'Код'})
    code: string;

    @ManyToOne(() => Aggregator)
    @JoinColumn({name: 'aggregator_id'})
    aggregator: Aggregator;
}
