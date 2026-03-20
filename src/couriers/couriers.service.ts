import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Couriers } from '../entities/Couriers';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { Aggregator } from '../entities/Aggregator';
import { Repositories } from '../base/dto/Repositories';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { CouriersAggregatorService } from '../couriers-aggregator/couriers-aggregator.service';
import { CreateCourierDto } from './dto/create-couriers.dto';
import { PassportService } from '../passport/passport.service';
import { DriverLicenseService } from '../driver-license/driverLicense.service';
import {DriverLicense} from "../entities/DriverLicense";
import {Passport} from "../entities/Passport";
import {CouriersAggregator} from "../entities/CouriersAggregator";
import {CourierHistory} from "../entities/CourierHistory";
import {QueryFindOptions} from "../base/query-find-options.dto";

@Injectable()
export class CouriersService extends BaseService<Couriers> {
    name = 'couriers';

    constructor(
        @InjectRepository(Couriers) repo: Repository<Couriers>,
        @InjectRepository(CourierHistory) private historyRepo: Repository<CourierHistory>,
        dataSource: DataSource,
        private couriersAggregatorService: CouriersAggregatorService,
        private passportService: PassportService,
        private driverLicenseService: DriverLicenseService,
        protected readonly rmqService: RabbitmqService,
    ) {
        super(repo, dataSource);
    }

    override rebuildAggregator({ aggregator, data }: {
        aggregator?: DeepPartial<Aggregator>;
        data?: DeepPartial<Couriers>
    }) {
        return super.rebuildAggregator({ data });
    }

//@ts-ignore
    async createItem(data: CreateCourierDto, aggregator: Aggregator): Promise<Couriers> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let courier = await this.findOneBy({ snils: data.snils });
            if (!courier) {
                const courierData = {
                    lastName: data.lastName,
                    firstName: data.firstName,
                    middleName: data.middleName,
                    birthDate: data.birthDate,
                    phone: data.phone,
                    email: data.email,
                    gender: data.gender,
                    inn: data.inn,
                    citizenship: data.citizenship,
                    snils: data.snils,
                };
                courier = this.repo.create(courierData);
                courier = await queryRunner.manager.save(courier);
            }

            const caRepo = this.dataSource.getRepository(CouriersAggregator);
            const ca = caRepo.create({
                couriers: courier,
                aggregator: aggregator,
                start_date: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(ca);

            let passportId = null;
            if (data.passport) {
                const passportRepo = this.dataSource.getRepository(Passport);
                const passport = passportRepo.create({
                    series: data.passport.series,
                    number: data.passport.number,
                    issueDate: data.passport.issueDate,
                    issuedBy: data.passport.issuedBy,
                    birthPlace: data.passport.birthPlace,
                    registrationAddress: data.passport.registrationAddress,
                    residenceAddress: data.passport.residenceAddress,
                    couriers: courier,
                });
                const savedPassport = await queryRunner.manager.save(passport);
                passportId = savedPassport.id;
            }

            let licenseId = null;
            if (data.driverLicense) {
                const licenseRepo = this.dataSource.getRepository(DriverLicense);
                const license = licenseRepo.create({
                    ...data.driverLicense,
                    couriers: courier,
                });
                const savedLicense = await queryRunner.manager.save(license);
                licenseId = savedLicense.id;
            }

            if (passportId || licenseId) {
                await queryRunner.manager.update(Couriers, courier.id, {
                    passport_id: passportId,
                    driverLicense_id: licenseId,
                });
                if (passportId) courier.passport_id = passportId;
                if (licenseId) courier.driverLicense_id = licenseId;
            }

            await queryRunner.commitTransaction();
            return courier;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error creating courier:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }



    async updateBy(where: any, data: DeepPartial<Couriers>, aggregator: Aggregator, checkField = null): Promise<boolean> {
        const existing = await this.findOneBy(where);
        if (!existing) {
            throw new Error('Courier not found');
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                courierId: existing.id,
                data: existing,
                action: 'UPDATE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            await queryRunner.manager.update(Couriers, existing.id, data);

            await queryRunner.commitTransaction();
            return true;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async remove(id: number, aggregator: Aggregator, { repo, manager }: Repositories<Couriers> = {}): Promise<void> {
        const existing = await this.findOneBy({ id });
        if (!existing) {
            return;
        }

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const history = this.historyRepo.create({
                courierId: existing.id,
                data: existing,
                action: 'DELETE',
                changedAt: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(history);

            const now = Math.floor(Date.now() / 1000);
            await queryRunner.manager.update(Couriers, id, { deleted_at: now });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async getHistory(courierId: number) {
        return this.historyRepo.find({
            where: { courierId },
            order: { changedAt: 'DESC' }
        });
    }

    async getCouriersByAggregator(aggregatorId: number): Promise<Couriers[]> {
        return await this.repo
            .createQueryBuilder('courier')
            .innerJoin('courier.couriersAggregator', 'ca')
            .leftJoinAndSelect('courier.passport', 'passport')
            .leftJoinAndSelect('courier.driverLicense', 'driverLicense')
            .where('ca.aggregator_id = :aggregatorId', { aggregatorId })
            .getMany();
    }

    async findWithSearch(query: QueryFindOptions, aggregatorId?: number) {
        const qb = this.repo.createQueryBuilder('courier')
            .leftJoinAndSelect('courier.passport', 'passport')
            .leftJoinAndSelect('courier.driverLicense', 'driverLicense')
            .innerJoin('courier.couriersAggregator', 'ca')
            .where('courier.deleted_at IS NULL'); // исключаем удалённых

        if (aggregatorId) {
            qb.andWhere('ca.aggregator_id = :aggregatorId', { aggregatorId });
        }

        if (query.search && query.search.trim()) {
            const searchTerm = `%${query.search.trim()}%`;
            qb.andWhere(
                `(courier.lastName ILIKE :search
              OR courier.firstName ILIKE :search
              OR courier.middleName ILIKE :search
              OR courier.phone ILIKE :search
              OR courier.email ILIKE :search
              OR courier.snils ILIKE :search
              OR courier.inn ILIKE :search
              OR CAST(courier.id AS TEXT) ILIKE :search
              OR passport.series ILIKE :search
              OR passport.number ILIKE :search
              OR driverLicense.series ILIKE :search
              OR driverLicense.number ILIKE :search)`,
                { search: searchTerm }
            );
        }

        const { take, skip } = this.getOffsetAndSkip(query);
        qb.take(take).skip(skip);

        qb.orderBy('courier.created_at', 'DESC');

        const [items, count] = await qb.getManyAndCount();
        return {
            count,
            offset: take,
            items,
        };
    }


}
