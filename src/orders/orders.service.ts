import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Order } from '../entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';

@Injectable()
export class OrdersService extends BaseService<Order> {
    constructor(
        @InjectRepository(Order) repo: Repository<Order>,
        dataSource: DataSource,
        private deliveryStatusHistory: DeliveryStatusHistoryService,
    ) {
        super(repo, dataSource);
    }

    async updateBy(where: any, data: DeepPartial<Order>, checkField: DeepPartial<Order> = null): Promise<boolean> {
        const item = await this.getBy(where, {}, ['status']);
        const res = await super.updateBy(where, data, checkField);
        if (data.status.id !== item.status.id) {
            await this.deliveryStatusHistory.createItem({
                order: item,
                status: data.status,
            });
        }
        return res;
    }
}
