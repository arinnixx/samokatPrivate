import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { TransportObdii } from './TransportObdii';

@Entity({ name: 'obdii', comment: 'OBDII устройства' })
export class Obdii extends BaseEntity {
    @Column({ unique: true, comment: 'Уникальный идентификатор устройства' })
    uid: string;

    @OneToMany(() => TransportObdii, (transportObdii) => transportObdii.obdii)
    transportConnections: TransportObdii[];
}