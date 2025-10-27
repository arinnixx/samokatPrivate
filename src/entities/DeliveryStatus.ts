import {Column, Entity} from 'typeorm';
import {BaseEntity} from '../base/base.entity';

@Entity({name: 'delivery-status', comment: 'Статусы'})
export class DeliveryStatus extends BaseEntity {

    @Column({comment: 'Статус'})
    status_name: string;
}
