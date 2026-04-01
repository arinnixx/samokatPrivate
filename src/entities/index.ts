import { Aggregator } from './Aggregator';
import { Statuses } from './Statuses';
import { Couriers } from './Couriers';
import { CouriersAggregator } from './CouriersAggregator';
import { RequestLog } from './RequestLogs';
import { Passport } from './Passport';
import { DriverLicense } from './DriverLicense';
import { CourierViolations } from './CourierViolations';
import { ViolationsType } from './ViolationType';
import { CourierShift } from './CourierShifts';
import {Admin} from "./Admin";
import {DeliveryBags} from "./DeliveryBags";
import {Order} from "./Orders";
import {Transport} from "./Transport";
import {TransportType} from "./TransportTypes";
import {DeliveryJackets} from "./DeliveryJackets";
import {CourierHistory} from "./CourierHistory";
import {OrderHistory} from "./OrderHistory";
import {ViolationsTypeHistory} from "./ViolationTypeHistory";
import {StatusesHistory} from "./StatusesHistory";
import {TransportTypeHistory} from "./TransportTypeHistory";
import {Obdii} from "./Obdii";
import {TransportObdii} from "./TransportObdii";


export default [
    Aggregator,
    Statuses,
    Couriers,
    CouriersAggregator,
    RequestLog,
    Passport,
    DriverLicense,
    CourierViolations,
    ViolationsType,
    CourierShift,
    Admin,
    DeliveryBags,
    DeliveryJackets,
    Order,
    Transport,
    TransportType,
    CourierHistory,
    OrderHistory,
    ViolationsTypeHistory,
    StatusesHistory,
    TransportTypeHistory,
    Obdii,
    TransportObdii
];