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
];