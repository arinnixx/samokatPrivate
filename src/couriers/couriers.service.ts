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
    async createItem(data: DeepPartiral, aggregator: Aggregator, {
        repo,
        manager,
    }: Repositories<Couriers> = {}): Promise<Couriers> {
        const { passport, driverLicense, ...couriers } = data;
        let item = await this.findOneBy({ snils: couriers.snils });
        if (!item) {
            //@ts-ignore
            item = await super.createItem(couriers, aggregator, {
                repo,
                manager,
            });
        }

        await this.couriersAggregatorService.createItem({ couriers: item }, aggregator);
        await this.driverLicenseService.createItem({ ...driverLicense, couriers: item }, aggregator);
        await this.passportService.createItem({ ...passport, couriers: item }, aggregator);
        return item;
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
