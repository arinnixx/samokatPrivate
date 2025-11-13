import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Couriers } from './Couriers';

@Entity({ name: 'passport', comment: 'Паспорт' })
export class Passport extends BaseEntity {

    @Column({ comment: 'Серия' })
    series: string;

    @Column({ comment: 'Номер' })
    number: string;

    @Column({ comment: 'Дата выдачи' })
    issueDate: string;

    @Column({ comment: 'Кем выдан' })
    issuedBy: string;

    @Column({ comment: 'Место рождения' })
    birthPlace: string;

    @Column({ comment: 'Адрес постоянной регистрации' })
    registrationAddress: string;

    @Column({ comment: 'Адрес фактическогo проживания' })
    residenceAddress: string;

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'couriers_id' })
    couriers: Couriers;
}
