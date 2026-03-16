import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';
import { BaseService } from './base.service';
import { GetCurrentAggregator } from '../decorators/getCurrentAggregator';
import { Aggregator } from '../entities/Aggregator';
import {BasePrivateService} from "./base-private.service";
import {DeepPartial} from "typeorm";

@ApiBearerAuth()
@ApiTags('Base')
@Controller()
export class BasePrivateController<
    TService extends BasePrivateService<TEntity>,
    TEntity extends BaseEntity,
> {
    constructor(protected readonly service: TService) {
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async get(
        @Param('id') id: number,
        @GetCurrentAggregator() aggregator: Aggregator): Promise<any> {
        return await this.service.get();
    }


    @Post()
    async create(
        @Body() createDto: DeepPartial<TEntity>,
        @GetCurrentAggregator() aggregator: Aggregator,
    ): Promise<number> {
        return await this.service.createItem(createDto, true);
    }

}