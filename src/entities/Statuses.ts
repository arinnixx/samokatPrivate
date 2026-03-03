import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'statuses', comment: 'Статусы' })
export class Statuses extends BaseEntity {

    @Column({ comment: 'Статус' })
    status_name: string;
}
