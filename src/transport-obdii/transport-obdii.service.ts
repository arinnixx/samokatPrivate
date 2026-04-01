import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { TransportObdii } from '../entities/TransportObdii';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class TransportObdiiService {
    name = 'transport-obdii';

    constructor(
        @InjectRepository(TransportObdii) private repo: Repository<TransportObdii>,
        protected dataSource: DataSource,
        protected readonly rmqService: RabbitmqService,
    ) {}

    async create(data: { transportId: number; obdiiId: number }) {
        const entity = this.repo.create(data);
        return this.repo.save(entity);
    }

    async findAll() {
        return this.repo.find({ relations: ['transport', 'obdii'] });
    }

    async findByTransport(transportId: number) {
        return this.repo.find({
            where: { transportId },
            relations: ['obdii'],
        });
    }

    async remove(transportId: number, obdiiId: number) {
        return this.repo.delete({ transportId, obdiiId });
    }

    async update(transportId: number, newObdiiId: number): Promise<TransportObdii> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.manager.delete(TransportObdii, { transportId });

            const newLink = queryRunner.manager.create(TransportObdii, {
                transportId,
                obdiiId: newObdiiId,
            });
            const savedLink = await queryRunner.manager.save(newLink);

            await queryRunner.commitTransaction();
            return savedLink;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}