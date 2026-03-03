import { Controller } from '@nestjs/common';
import {BaseController} from "../base/base.controller";
import {PassportService} from "./passport.service";
import {Passport} from "../entities/Passport";

@Controller('passport')
export class PassportController extends BaseController<PassportService, Passport> {
    constructor(
        service: PassportService,
    ) {
        super(service);
    }
}
