import {Column, Entity} from 'typeorm';
import {BaseEntity} from '../base/base.entity';

@Entity({name: 'aggregator', comment: 'Агрегатор'})
export class Aggregator extends BaseEntity {

    @Column({comment: 'Название'})
    name: string;

    @Column({comment: 'Токен'})
    token: string;
}
