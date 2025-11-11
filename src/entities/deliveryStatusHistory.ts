import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { StatusType } from './StatusType';

@Entity({ name: 'delivery-status-history', comment: 'Сотрудник' })
export class DeliveryStatusHistory extends BaseEntity {

    @ManyToOne(() => StatusType)
    @JoinColumn({ name: 'status_id' })
    status: StatusType;


}
