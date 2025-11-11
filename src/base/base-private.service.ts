import { DataSource, DeepPartial, FindOptionsRelationByString, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from './base.entity';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { SafeLog } from '../decorators/safe-http.decorator';

export class BasePrivateService<TEntity extends BaseEntity> {
    protected name = 'base';

    constructor(
        protected readonly repo: Repository<TEntity>,
        protected readonly dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {
    }

    async createItem(data: DeepPartial<TEntity>, isSendRmq = false): Promise<number> {
        const item: TEntity = this.repo.create(data);
        await this.repo.save(item);
        if (isSendRmq) {
            await this.rmqService.publish({
                id: item.id,
                name: this.name,
                method: 'POST',
                data: { id: item.id, ...data },
            });
        }
        return item.id;
    }

    async updateBy(where: any, data: DeepPartial<TEntity>, isSendRmq = false): Promise<boolean> {
        // @ts-ignore
        const item = await this.repo.update(where, data);
        if (isSendRmq) {
            await this.rmqService.publish({
                id: item,
                name: this.name,
                method: 'PATCH',
                data,
            });
        }
        return true;
    }

    async remove(id: number, isSendRmq = false): Promise<void> {
        const item = await this.repo.softDelete(id);
        if (isSendRmq) {
            await this.rmqService.publish({
                id: item,
                name: this.name,
                method: 'DELETE',
            });
        }
    }

    @SafeLog()
    async getBy(where: FindOptionsWhere<TEntity>, loadRelations: FindOptionsRelationByString = []) {
        // @ts-ignore
        const entity: TEntity = await this.findOneBy(where, loadRelations);
        if (!entity) {
            throw new Error('Запись не найдена');
        }
        return entity;
    }

    @SafeLog()
    async findOneBy(where: FindOptionsWhere<TEntity>, loadRelations: FindOptionsRelationByString = []) {
        let relations = null;
        if (Array.isArray(loadRelations) && loadRelations.length) {
            relations = loadRelations;
        }
        return await this.repo.findOne({
            where,
            relations,
        });
    }
}

