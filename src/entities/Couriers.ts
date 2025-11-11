import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Passport } from './Passport';
import { DriverLicense } from './DriverLicense';

@Entity({ name: 'couriers', comment: 'Сотрудник' })
export class Couriers extends BaseEntity {

    @Column({ comment: 'Фамилия курьера' })
    lastName: string;

    @Column({ comment: 'Имя курьера' })
    firstName: string;

    @Column({ comment: 'Отчество курьера' })
    middleName: string;

    @Column({ comment: 'Пол курьера' })
    gender: string;

    @Column({ comment: 'Гражданство' })
    citizenship: string;

    @Column({ comment: 'Номер телефона курьера' })
    phone: string;

    @Column({ comment: 'Дата рождения курьера' })
    birthDate: number;

    @Column({ comment: 'Почта' })
    email: string;

    @Column({ comment: 'СНИЛС', nullable: true, unique: true })
    snils: string;

    @Column({ comment: 'ИНН', nullable: true, unique: true })
    inn: string;

    @ManyToOne(() => Passport)
    @JoinColumn({ name: 'passport_id' })
    passport: Passport;

    @ManyToOne(() => DriverLicense)
    @JoinColumn({ name: 'driverLicense_id' })
    driverLicense: DriverLicense;

}
