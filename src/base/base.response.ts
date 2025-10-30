import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from './base.entity';

export class BaseResponseLoad<TEntity extends BaseEntity> {
    @ApiProperty()
    offset: number;

    @ApiProperty()
    count: number;

    @ApiProperty()
    items: TEntity[];
}

export class BaseResponseSingle<TEntity extends BaseEntity> {
    @ApiProperty()
    item: TEntity;
}

export class BaseResponseMessage {
    @ApiProperty()
    message: string;

    @ApiProperty({ required: false })
    id?: number;
}