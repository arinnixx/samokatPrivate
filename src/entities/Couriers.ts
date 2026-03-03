import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Passport } from './Passport';
import { DriverLicense } from './DriverLicense';
import {CouriersAggregator} from "./CouriersAggregator";

@Entity({ name: 'couriers', comment: 'Сотрудник' })
export class Couriers extends BaseEntity {

    @Column({ comment: 'Фамилия курьера' })
    lastName: string;

    @Column({ comment: 'Имя курьера' })
    firstName: string;

    @Column({ comment: 'Отчество курьера', nullable: true })
    middleName: string;

    @Column({ comment: 'Пол курьера', nullable: true })
    gender: string;

    @Column({ comment: 'Гражданство', nullable: true })
    citizenship: string;

    @Column({ comment: 'Номер телефона курьера' })
    phone: string;

    @Column({ type: 'bigint', comment: 'Дата рождения курьера' })
    birthDate: number;

    @Column({ comment: 'Почта', nullable: true })
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

    @OneToMany(() => CouriersAggregator, (ca) => ca.couriers)
    couriersAggregator: CouriersAggregator[];
}
