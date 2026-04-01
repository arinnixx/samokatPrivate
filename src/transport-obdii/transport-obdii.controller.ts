import {Controller, Get, Post, Delete, Body, Param, UseGuards, Patch} from '@nestjs/common';
import { TransportObdiiService } from './transport-obdii.service';
import { AuthGuard } from '../guard/auth.guard';
import {CreateTransportObdiiDto} from "./dto/create-transport-obdii";
import {AuthGuardAdmin} from "../guard/auth.guard.admin";
import {UpdateTransportObdiiDto} from "./dto/update-transport-obdii.dto";

@Controller('transport-obdii')
@UseGuards(AuthGuardAdmin)
export class TransportObdiiController {
    constructor(private readonly service: TransportObdiiService) {}

    @Post()
    async create(@Body() dto: CreateTransportObdiiDto) {
        return this.service.create(dto);
    }

    @Get()
    async findAll() {
        return this.service.findAll();
    }

    @Get('transport/:transportId')
    async findByTransport(@Param('transportId') transportId: number) {
        return this.service.findByTransport(transportId);
    }

    @Delete(':transportId/:obdiiId')
    async remove(@Param('transportId') transportId: number, @Param('obdiiId') obdiiId: number) {
        return this.service.remove(transportId, obdiiId);
    }

    @Patch(':transportId')
    async update(
        @Param('transportId') transportId: number,
        @Body() dto: UpdateTransportObdiiDto,
    ) {
        return this.service.update(transportId, dto.obdiiId);
    }
}