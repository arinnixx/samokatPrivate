import { PartialType } from '@nestjs/swagger';
import {CreateObdiiDto} from "./create-obdii";

export class UpdateObdiiDto extends PartialType(CreateObdiiDto) {}