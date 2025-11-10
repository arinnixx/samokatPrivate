import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'status-type', comment: 'Статусы' })
export class StatusType extends BaseEntity {

    @Column({ comment: 'Статус' })
    status_name: string;
}
