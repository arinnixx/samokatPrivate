import {Controller, Get, HttpCode, HttpStatus, Param, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { GetCurrentAggregator } from '../decorators/getCurrentAggregator';
import { Aggregator } from '../entities/Aggregator';
import {SafeHttp} from "../decorators/safe-http.decorator";
import {QueryFindOptions} from "./query-find-options.dto";
import {Repository} from "typeorm";

@ApiBearerAuth()
@ApiTags('Base')
@Controller()
export class BaseController<
    TService extends BaseService<TEntity>,
    TEntity extends BaseEntity,
> {
    constructor(protected readonly service: TService) {
    }

    @ApiResponse({ status: HttpStatus.OK, type: Repository<TEntity> })
    @Get()
    @SafeHttp()
    async loadList(@Query() query: QueryFindOptions) {
        return this.service.findList(query);
    }

}