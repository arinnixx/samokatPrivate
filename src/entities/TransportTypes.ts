import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'transport_types', comment: 'Типы транспорта' })
export class TransportType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: 'Название типа' })
    name: string;
}
