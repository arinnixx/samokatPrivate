import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Aggregator} from "./Aggregator";
import {BaseEntity} from '../base/base.entity';

@Entity({name: 'delivery-jackets', comment: 'Куртки'})
export class DeliveryJackets extends BaseEntity {

    @Column({comment: 'Код'})
    code: string;

    @ManyToOne(() => Aggregator)
    @JoinColumn({name: 'aggregator_id'})
    aggregator: Aggregator;
}
