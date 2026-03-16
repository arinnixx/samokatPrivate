import { BeforeInsert, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class DateInEntity {
    @ApiProperty({ example: 1717200000 })
    @Column({ type: 'bigint', nullable: true, comment: 'Дата создания' })
    created_at: number;

    @BeforeInsert()
    setCreated_at() {
        this.created_at = Math.floor(Date.now() / 1000);
    }

    @Exclude()
    @Column({ type: 'bigint', nullable: true, comment: 'Дата удаления' })
    deleted_at: number;
}

@Entity()
export class BaseEntity extends DateInEntity {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn({ comment: 'Идентификатор' })
    id: number;
}
