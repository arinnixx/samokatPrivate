import { Controller } from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {DriverLicenseService} from "./driverLicense.service";
import {DriverLicense} from "../entities/DriverLicense";

@Controller('driver-license')
export class DriverLicenseController extends BaseController<DriverLicenseService, DriverLicense> {
    constructor(
        service: DriverLicenseService,
    ) {
        super(service);
    }
}
