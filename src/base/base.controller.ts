import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { GetCurrentAggregator } from '../decorators/getCurrentAggregator';
import { Aggregator } from '../entities/Aggregator';
import {SafeHttp} from "../decorators/safe-http.decorator";
import {QueryFindOptions} from "./query-find-options.dto";
import {DeepPartial, Repository} from "typeorm";

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

    @ApiResponse({ status: HttpStatus.CREATED })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() createDto: DeepPartial<TEntity>,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<TEntity> {
        return this.service.createItem(createDto, aggregator);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() updateDto: DeepPartial<TEntity>,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<boolean> {
        return await this.service.updateBy({ id }, updateDto, aggregator);
    }

    @Delete(':id')
    async remove(
        @Param('id') id: number,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<void> {
        return await this.service.remove(id, aggregator);
    }

}