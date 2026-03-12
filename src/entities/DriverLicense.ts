import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { Couriers } from './Couriers';

@Entity({ name: 'driver_license', comment: 'Водительское удостоверение' })
export class DriverLicense extends BaseEntity {

    @Column({ comment: 'Государство выдавшее ВУ' })
    country: string;

    @Column({ comment: 'Серия ВУ' })
    series: string;

    @Column({ comment: 'Номер ВУ' })
    number: string;

    @Column({ comment: 'Дата выдачи ВУ' })
    issueDate: string;

    @Column({ comment: 'Дата окончания действия ВУ' })
    expiryDate: string;

    @Column({ comment: 'Год начала ВУ' })
    experience_startYear: string;

    @Column({ name: 'couriers_id', nullable: true })
    couriers_id: number;

    @ManyToOne(() => Couriers)
    @JoinColumn({ name: 'couriers_id' })
    couriers: Couriers;
}