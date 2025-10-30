import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'employee', comment: 'Сотрудник' })
export class Employee extends BaseEntity {

    @Column({ comment: 'ФИО' })
    fio: string;

    @Column({ comment: 'Номер телефона' })
    phone: string;

    @Column({ comment: 'Почта' })
    email: string;

    @Column({ comment: 'СНИЛС', nullable: true , unique: true })
    snils: string;
    // @Column({ comment: 'Токен' })
    // token: string;

}
