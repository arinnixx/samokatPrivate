import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'admin', comment: 'Администратор' })
export class Admin extends BaseEntity {

    @Column({ name: 'login'})
    login: string;

    @Column({ name: 'password'})
    password: string;

    @Column({ name: 'lookup_key' })
    lookupKey: string;

    @Column({ name: 'token_hash' })
    tokenHash: string;

    @Column()
    salt: string;

    @Column({nullable: true})
    token: string;
}
