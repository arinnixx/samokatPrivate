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

@Injectable()
export class CouriersService extends BaseService<Couriers> {
    name = 'couriers';

    constructor(
        @InjectRepository(Couriers) repo: Repository<Couriers>,
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
            // 1. Проверяем существование курьера по снилс
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

            // 2. Связь с агрегатором
            const caRepo = this.dataSource.getRepository(CouriersAggregator);
            const ca = caRepo.create({
                couriers: courier,
                aggregator: aggregator,
                start_date: Math.floor(Date.now() / 1000),
            });
            await queryRunner.manager.save(ca);

            // 3. Паспорт
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

            // 4. Водительские права
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

            // 5. Обновляем курьера с ID паспорта и прав
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
    async updateBy(where: any, data: DeepPartial<Couriers>, aggregator: Aggregator, checkField: DeepPartial<Couriers> = null): Promise<boolean> {
        const { passport, driverLicense, ...newData } = data;

        if (passport) {
            await this.passportService.updateBy({ couriers: { id: where.id } }, passport, aggregator);
        }
        if (driverLicense) {
            await this.driverLicenseService.updateBy({ couriers: { id: where.id } }, driverLicense, aggregator);
        }
        if (newData) {
            return await super.updateBy(where, newData, aggregator, checkField);
        }
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

}
