import { DataSource, DeepPartial, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Repositories } from './dto/Repositories';
import { BaseService } from './base.service';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

export class BasePrivateService<TEntity extends BaseEntity> extends BaseService<TEntity> {
    protected name = 'base';

    constructor(
        protected readonly repo: Repository<TEntity>,
        protected readonly dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    async createItem(data: DeepPartial<TEntity>, {
        repo,
        manager,
    }: Repositories<TEntity> = {}): Promise<number> {
        const item = await super.createItem(data, {
            repo,
            manager,
        });
        await this.rmqService.publish({
            id: item,
            name: this.name,
            method: 'POST',
            data,

        });
        return item;
    }

    async updateBy(where: any, data: DeepPartial<TEntity>, checkField: DeepPartial<TEntity> = null): Promise<boolean> {
        const item = await super.updateBy(where, data, checkField);
        await this.rmqService.publish({
            id: item,
            name: this.name,
            method: 'PATCH',
            data,
        });
        return item;
    }

    async remove(id: number, { repo, manager }: Repositories<TEntity> = {}): Promise<void> {
        const item = await super.remove(id, { repo, manager });
        await this.rmqService.publish({
            id: item,
            name: this.name,
            method: 'DELETE',
        });
        return item;
    }
}

