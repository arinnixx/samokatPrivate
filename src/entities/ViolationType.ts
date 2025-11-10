import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { TransportType } from './TransportTypes';
import { Couriers } from './Couriers';

@Entity({ name: 'courier_violations', comment: 'Агрегатор' })
export class ViolationsType extends BaseEntity {

    @Column({ comment: 'Категория' })
    category: string;

    @Column({ comment: 'Код' })
    code: string;
}
