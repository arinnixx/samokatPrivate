import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { TransportType } from './TransportTypes';
import { Aggregator } from './Aggregator';
import { BaseEntity } from '../base/base.entity';
import {TransportObdii} from "./TransportObdii";


@Entity({ name: 'transport', comment: 'Средства передвижения' })
export class Transport extends BaseEntity {

    @PrimaryGeneratedColumn({ comment: 'Идентификатор' })
    id: number;

    @Column({ name: 'type_id', nullable: true })
    type_id: number;

    @ManyToOne(() => TransportType)
    @JoinColumn({ name: 'type_id' })
    type: TransportType;

    @Column({ comment: 'Код' })
    code: string;

    @Column({ name: 'aggregator_id', nullable: true })
    aggregator_id: number;

    @ManyToOne(() => Aggregator)
    @JoinColumn({ name: 'aggregator_id' })
    aggregator: Aggregator;

    @OneToMany(() => TransportObdii, (transportObdii) => transportObdii.transport)
    obdiiConnections: TransportObdii[];
}
