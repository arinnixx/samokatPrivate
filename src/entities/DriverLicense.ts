import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'driverLicense', comment: 'Сотрудник' })
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

}
