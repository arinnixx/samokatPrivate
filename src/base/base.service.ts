import { DataSource, DeepPartial, EntityManager, FindOptionsOrder, FindOptionsRelationByString, FindOptionsWhere, Repository } from 'typeorm';
import { QueryFindOptions } from './query-find-options.dto';
import { BaseEntity } from './base.entity';
import { SafeLog } from '../decorators/safe-http.decorator';
import { Repositories } from './dto/Repositories';
import { Aggregator } from '../entities/Aggregator';

type callbackTransactionBase<TypeTransaction> = <TEntity extends BaseEntity> (repository: Repository<TEntity>, manager: EntityManager) => Promise<TypeTransaction>
type callbackTransaction<TypeTransaction> = (manager: EntityManager) => Promise<TypeTransaction>

export class FindOptions {
    OFFSET = 100;
    MAX_OFFSET = 1000;
    protected readonly DEFAULT_WHERE = {} as const;
    ORDER_BY = { id: 'DESC' };

    @SafeLog()
    protected getOffset(offset: string) {
        const currentOffset = parseInt(offset);
        return currentOffset <= this.MAX_OFFSET ? currentOffset : this.OFFSET;
    }

    @SafeLog()
    protected getSkip(page: string) {
        const currentPage = parseInt(page);
        return currentPage ? currentPage - 1 : 0;
    }

    @SafeLog()
    protected getOffsetAndSkip(query: any) {
        const take = this.getOffset(query.offset);
        return {
            take, skip: this.getSkip(query.page) * take,
        };
    }

    getWhere(query: QueryFindOptions): FindOptionsWhere<any> | FindOptionsWhere<any>[] {
        // console.error('Метод должен быть override');
        const where: FindOptionsWhere<any> = {};
        return where;
    }

    getOrder(): FindOptionsOrder<any> {
        // @ts-ignore
        const order: FindOptionsOrder<TEntity> = { id: 'DESC' };
        return order;
    }

    @SafeLog()
    protected getFindOptions(query: QueryFindOptions, addDefaultWhere = true) {
        let where = this.getWhere(query);
        let order = this.getOrder();
        if (addDefaultWhere) {
            if (Array.isArray(where)) {
                where = where.map(elm => ({
                    ...elm,
                    ...this.DEFAULT_WHERE,
                }));
            } else {
                where = { ...where, ...this.DEFAULT_WHERE };
            }
        }
        const offsetAndSkip = this.getOffsetAndSkip(query);
        return { where, ...offsetAndSkip, order };
    }
}

export class Transaction extends FindOptions {
    constructor(
        protected readonly dataSource: DataSource,
    ) {
        super();
    }

    async wrapperTransaction<TypeTransaction = void>(cb: callbackTransaction<TypeTransaction>): Promise<TypeTransaction> {
        try {
            return await this.dataSource.transaction<TypeTransaction>(async (manager): Promise<TypeTransaction> => {
                return await cb(manager);
            });
        } catch (e) {
            console.error('wrapperTransaction', e.message);
            throw new Error(e.message);
        }
    }
}

export class BaseService<TEntity extends BaseEntity> {

    constructor(
        protected readonly repo: Repository<TEntity>,
        protected readonly dataSource: DataSource,
    ) {
    }

    rebuildData({ aggregator, data }: { aggregator?: DeepPartial<Aggregator>, data?: DeepPartial<TEntity> }) {
        const newDataAggregator = {};
        if (aggregator) {
            newDataAggregator['aggregator'] = { ...aggregator };
        }
        // @ts-ignore
        data = data ?? {};
        return {
            ...newDataAggregator,
            ...data,
        };
    }

    async wrapperTransaction<TypeTransaction = void>(cb: callbackTransactionBase<TypeTransaction>): Promise<TypeTransaction> {
        try {
            return await this.dataSource.transaction<TypeTransaction>(async (manager): Promise<TypeTransaction> => {
                const repository = manager.withRepository(this.repo);
                return await cb(repository, manager);
            });
        } catch (e) {
            console.error('wrapperTransaction', e.message);
            throw new Error(e.message);
        }
    }

    @SafeLog()
    public async create(aggregator: Aggregator, data: DeepPartial<TEntity>) {
        return await this.wrapperTransaction<number>(async (repo) => {
            // @ts-ignore
            return await this.createItem(aggregator, data, { repo });
        });
    }

    @SafeLog()
    public async createItem(aggregator: Aggregator, data: DeepPartial<TEntity>, {
        repo,
        manager,
    }: Repositories<TEntity> = {}): Promise<number> {
        if (manager) {
            repo = manager.withRepository(this.repo);
        }
        repo ??= this.repo;
        const newData = this.rebuildData({ aggregator, data });
        const repoEntity: TEntity = repo.create(newData);
        await repo.save(repoEntity);
        return repoEntity.id;
    }

    public async updateBy(aggregator: Aggregator, where: FindOptionsWhere<TEntity> | any, data: DeepPartial<TEntity>, checkField: DeepPartial<TEntity> = null) {
        const repoEntity: TEntity = await this.findOneBy(where);
        await this.wrapperTransaction(async (repo) => {
            // @ts-ignore
            await this.updateItem(aggregator, repoEntity.id, data, { repo });
        });
        return true;
    }

    @SafeLog()
    async updateItem(aggregator: Aggregator, id: number, data: DeepPartial<TEntity> = null, {
        repo,
        manager,
    }: Repositories<TEntity> = {}) {
        if (manager) {
            repo = manager.withRepository(this.repo);
        }
        repo ??= this.repo;
        const newData = this.rebuildData({ aggregator, data });
        // @ts-ignore
        await repo.update({ id }, newData);
    }

    @SafeLog()
    async remove(aggregator: Aggregator, id: number, { repo, manager }: Repositories<TEntity> = {}) {
        if (manager) {
            repo = manager.withRepository(this.repo);
        }
        repo ??= this.repo;
        const newData = this.rebuildData({ aggregator });
        // @ts-ignore
        await repo.softRemove({ id, ...newData });
    }

    @SafeLog()
    async getBy(where: FindOptionsWhere<TEntity>, {
        repo,
        manager,
    }: Repositories<TEntity> = {}, loadRelations: FindOptionsRelationByString = []) {
        if (manager) {
            repo = manager.withRepository(this.repo);
        }
        repo ??= this.repo;
        // @ts-ignore
        const entity: TEntity = await this.findOneBy(where, repo, loadRelations);
        if (!entity) {
            throw new Error('Запись не найдена');
        }
        return entity;
    }

    @SafeLog()
    async findOneBy(where: FindOptionsWhere<TEntity>, {
        repo,
        manager,
    }: Repositories<TEntity> = {}, loadRelations: FindOptionsRelationByString = []) {
        if (manager) {
            repo = manager.withRepository(this.repo);
        }
        repo ??= this.repo;
        let relations = null;
        if (Array.isArray(loadRelations) && loadRelations.length) {
            relations = loadRelations;
        }
        return await repo.findOne({
            where,
            relations,
        });
    }
}

