import {Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {BaseEntity} from "./base.entity";
import {BaseResponseMessage, BaseResponseSingle} from './base.response';
import {SafeLog} from "../decorators/safe-http.decorator";
import {BaseService} from "./base.service";
import {DeepPartial} from "typeorm";
import {CreateHandbookDto, UpdateHandbookDto} from "./dto/base.dto";
import {GetCurrentAggregator} from "../decorators/getCurrentAggregator";
import {Aggregator} from "../entities/Aggregator";

@ApiBearerAuth()
@ApiTags('Base')
@Controller()
export class BaseController<
    TService extends BaseService<TEntity>,
    TEntity extends BaseEntity,
    TCreateDto extends DeepPartial<TEntity> & CreateHandbookDto,
    TUpdateDto extends DeepPartial<TEntity> & UpdateHandbookDto,
> {
    constructor(protected readonly service: TService) {
    }


    @ApiOperation({summary: 'Create new record'})
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: BaseResponseSingle,
        description: 'Record created successfully'
    })
    @Post()
    @SafeLog()
    async create(@Body() createDto: TCreateDto): Promise<number> {
        return await this.service.create(createDto);
    }

    @ApiOperation({summary: 'Update record'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: BaseResponseSingle,
        description: 'Record updated successfully'
    })
    @Patch(':id')
    @SafeLog()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: TUpdateDto,
    ): Promise<boolean> {
        return await this.service.updateBy({id}, updateDto);
    }

    @ApiOperation({summary: 'Delete record'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: BaseResponseMessage,
        description: 'Record deleted successfully'
    })
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @SafeLog()
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return await this.service.remove(id);
    }
}

export class BaseAggregatorController<
    TService extends BaseService<TEntity>,
    TEntity extends BaseEntity,
    TCreateDto extends DeepPartial<TEntity> & CreateHandbookDto,
    TUpdateDto extends DeepPartial<TEntity> & UpdateHandbookDto,
>  {

    constructor(protected readonly service: TService) {
    }

    @ApiOperation({summary: 'Create new record'})
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: BaseResponseSingle,
        description: 'Record created successfully'
    })
    @Post()
    @SafeLog()
    async create(
        @Body() createDto: TCreateDto,
        @GetCurrentAggregator() aggregator: Aggregator
    ): Promise<number> {
        return await this.service.create( createDto);
    }

    @ApiOperation({summary: 'Update record'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: BaseResponseSingle,
        description: 'Record updated successfully'
    })
    @Patch(':id')
    @SafeLog()
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateDto: TUpdateDto,
        @GetCurrentAggregator() aggregator: Aggregator
    ): Promise<boolean> {
        console.log(aggregator)
        return await this.service.updateBy( {id}, updateDto);
    }

    @ApiOperation({summary: 'Delete record'})
    @ApiResponse({
        status: HttpStatus.OK,
        type: BaseResponseMessage,
        description: 'Record deleted successfully'
    })
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @SafeLog()
    async remove(
        @Param('id', ParseIntPipe) id: number,
        @GetCurrentAggregator() aggregator: Aggregator
    ): Promise<void> {
        return await this.service.remove( id);
    }

}