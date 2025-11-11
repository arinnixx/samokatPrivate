import { Aggregator } from './Aggregator';
import { DeliveryBags } from './DeliveryBags';
import { DeliveryJackets } from './DeliveryJackets';
import { StatusType } from './StatusType';
import { Couriers } from './Couriers';
import { Transport } from './Transport';
import { CouriersAggregator } from './CouriersAggregator';
import { Order } from './Orders';
import { TransportType } from './TransportTypes';
import { DeliveryStatusHistory } from './deliveryStatusHistory';
import { RequestLog } from './RequestLogs';
import { Passport } from './Passport';
import { DriverLicense } from './DriverLicense';
import { CourierViolations } from './CourierViolations';
import { ViolationsType } from './ViolationType';
import { CourierShift } from './CourierShifts';

export default [
    Aggregator,
    DeliveryBags,
    DeliveryJackets,
    StatusType,
    Couriers,
    Transport,
    Couriers,
    CouriersAggregator,
    Order,
    TransportType,
    DeliveryStatusHistory,
    RequestLog,
    Passport,
    DriverLicense,
    CourierViolations,
    ViolationsType,
    CourierShift,

];