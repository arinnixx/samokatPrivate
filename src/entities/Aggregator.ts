import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';

@Entity({ name: 'aggregator', comment: 'Агрегатор' })
export class Aggregator extends BaseEntity {

    @Column({ comment: 'Название' })
    name: string;

    @Column({ name: 'lookup_key' })
    lookupKey: string;

    @Column({ name: 'token_hash' })
    tokenHash: string;

    @Column()
    salt: string;

    @Column({nullable: true})
    token: string;

    @Column({ name: 'login'})
    login: string;

    @Column({ name: 'password'})
    password: string;

    @Column({ name: 'is_blocked', default: false })
    isBlocked: boolean;

}
