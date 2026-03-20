import {Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Patch, Param} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BasePrivateController } from '../base/base-private.controller';
import { Aggregator } from '../entities/Aggregator';
import { AggregatorService } from './aggregator.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthGuard } from '../guard/auth.guard';
import { GetCurrentAggregator } from '../decorators/getCurrentAggregator';
import {AuthGuardAdmin} from "../guard/auth.guard.admin";


@Controller('aggregator')
export class AggregatorController extends BasePrivateController<AggregatorService, Aggregator> {
    constructor(service: AggregatorService) {
        super(service);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Вход в систему по логину и паролю' })
    @ApiResponse({ status: 200, type: LoginResponseDto })
    @ApiResponse({ status: 401, description: 'Неверный логин или пароль' })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const { aggregator, token } = await this.service.loginAggregator(
            loginDto.login,
            loginDto.password
        );
        return new LoginResponseDto(aggregator, token);
    }

    @Post('logout')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Выход из системы' })
    @ApiResponse({ status: 200, description: 'Успешный выход' })
    async logout(@GetCurrentAggregator() aggregator: Aggregator): Promise<{ message: string }> {
        await this.service.logoutAggregator(aggregator.id);
        return { message: 'Успешный выход из системы' };
    }

    @Post('check-session')
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Проверка текущей сессии' })
    @ApiResponse({ status: 200, description: 'Информация о текущем агрегаторе' })
    async checkSession(@GetCurrentAggregator() aggregator: Aggregator): Promise<any> {
        return {
            aggregator: {
                id: aggregator.id,
                name: aggregator.name,
                login: aggregator.login,
                lookupKey: aggregator.lookupKey,
            }
        };
    }
}



