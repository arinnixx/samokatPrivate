import { EntityManager, Repository } from 'typeorm';

export class Repositories<TEntity> {
    repo?: Repository<TEntity>;
    manager?: EntityManager;
}