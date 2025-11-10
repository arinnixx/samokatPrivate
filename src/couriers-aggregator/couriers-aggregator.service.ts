import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { CouriersAggregator } from '../entities/CouriersAggregator';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CouriersAggregatorService extends BaseService<CouriersAggregator> {
    name = "employee-aggregator";
    constructor(
        @InjectRepository(CouriersAggregator) repo: Repository<CouriersAggregator>,
        dataSource: DataSource,
    ) {
        super(repo, dataSource);
    }
}
