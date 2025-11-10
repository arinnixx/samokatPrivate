import { Aggregator } from './Aggregator';
import { DeliveryBags } from './DeliveryBags';
import { DeliveryJackets } from './DeliveryJackets';
import { StatusType } from './StatusType';
import { Employee } from './Employee';
import { Transport } from './Transport';
import { EmployeeAggregator } from './EmployeeAggregator';
import { Order } from './Orders';
import { TransportType } from './TransportTypes';
import { DeliveryStatusHistory } from './deliveryStatusHistory';
import { RequestLog } from './RequestLogs';
import { Passport } from './Passport';
import { DriverLicense } from './DriverLicense';

export default [
    Aggregator,
    DeliveryBags,
    DeliveryJackets,
    StatusType,
    Employee,
    Transport,
    Employee,
    EmployeeAggregator,
    Order,
    TransportType,
    DeliveryStatusHistory,
    RequestLog,
    Passport,
    DriverLicense
];