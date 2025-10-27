import {Column, Entity, JoinColumn, ManyToOne} from 'typeorm';
import {Aggregator} from './Aggregator';
import {BaseEntity} from '../base/base.entity';

@Entity({name: 'request_logs', comment: 'Логирование запросов'})
export class RequestLog extends BaseEntity {

    @ManyToOne(() => Aggregator)
    @JoinColumn({name: 'aggregator_id'})
    aggregator: Aggregator;

    @Column({type: 'json', comment: 'JSON запрос'})
    request_data: any;


}
