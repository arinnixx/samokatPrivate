import { Injectable } from '@nestjs/common';
import { BaseService } from '../base/base.service';
import { Order } from '../entities/Orders';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { DeliveryStatusHistoryService } from '../delivery-status-history/delivery-status-history.service';
import { Aggregator } from '../entities/Aggregator';

@Injectable()
export class OrdersService extends BaseService<Order> {
    name="orders"
    constructor(
        @InjectRepository(Order) repo: Repository<Order>,
        dataSource: DataSource,
        private deliveryStatusHistory: DeliveryStatusHistoryService,
    ) {
        super(repo, dataSource);
    }

    async updateBy(aggregator:Aggregator,where: any, data: DeepPartial<Order>, checkField: DeepPartial<Order> = null): Promise<boolean> {
       const newWhere = this.rebuildAggregator({ aggregator, where })
        const item = await this.getBy(newWhere, {}, ['status']);
        const res = await super.updateBy(aggregator,where, data, checkField);
        if (data.status.id !== item.status.id) {
            await this.deliveryStatusHistory.createItem({
                order: item,
                status: data.status,
            });
        }
        return res;
    }
}
