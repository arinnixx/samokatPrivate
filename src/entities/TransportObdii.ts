import {Entity, ManyToOne, JoinColumn, PrimaryColumn, Column} from 'typeorm';
import { Transport } from './Transport';
import { Obdii } from './Obdii';
import {BaseEntity} from "../base/base.entity";

@Entity({ name: 'transport_obdii', comment: 'Связь транспорта с OBDII устройствами' })
export class TransportObdii extends BaseEntity{
    @Column({ name: 'transport_id' })
    transportId: number;

    @Column({ name: 'obdii_id' })
    obdiiId: number;

    @ManyToOne(() => Transport, (transport) => transport.obdiiConnections)
    @JoinColumn({ name: 'transport_id' })
    transport: Transport;

    @ManyToOne(() => Obdii, (obdii) => obdii.transportConnections)
    @JoinColumn({ name: 'obdii_id' })
    obdii: Obdii;
}