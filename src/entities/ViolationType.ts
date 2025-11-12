import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'violations_type', comment: 'Агрегатор' })
export class ViolationsType extends BaseEntity {

    @Column({ comment: 'Категория' })
    category: string;

    @Column({ comment: 'Код' })
    code: string;
}
