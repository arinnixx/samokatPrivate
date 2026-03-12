import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Aggregator } from './Aggregator';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'delivery_jackets', comment: 'Куртки' })
export class DeliveryJackets extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: 'Идентификатор' })
    id: number;

    @Column({ comment: 'Код' })
    code: string;

    @Column({ name: 'aggregator_id', nullable: true })
    aggregator_id: number;

    @ManyToOne(() => Aggregator)
    @JoinColumn({ name: 'aggregator_id' })
    aggregator: Aggregator;

}
