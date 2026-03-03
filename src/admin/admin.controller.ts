import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BasePrivateController } from '../base/base-private.controller';
import { Admin } from '../entities/Admin';
import { AdminService } from './admin.service';
import { LoginDto} from "./dto/login.dto";
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthGuardAdmin} from "../guard/auth.guard.admin";
import { GetCurrentAdmin } from '../decorators/getCurrentAdmin';


@Controller('admin')
export class AdminController extends BasePrivateController<AdminService, Admin> {
    constructor(service: AdminService) {
        super(service);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Вход в систему по логину и паролю' })
    @ApiResponse({ status: 200, type: LoginResponseDto })
    @ApiResponse({ status: 401, description: 'Неверный логин или пароль' })
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        const { admin, token } = await this.service.loginAdmin(
            loginDto.login,
            loginDto.password
        );
        return new LoginResponseDto(admin, token);
    }

    @Post('logout')
    @UseGuards(AuthGuardAdmin)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Выход из системы' })
    @ApiResponse({ status: 200, description: 'Успешный выход' })
    async logout(@GetCurrentAdmin() admin: Admin): Promise<{ message: string }> {
        await this.service.logoutAdmin(admin.id);
        return { message: 'Успешный выход из системы' };
    }

    @Post('check-session')
    @UseGuards(AuthGuardAdmin)
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Проверка текущей сессии' })
    @ApiResponse({ status: 200, description: 'Информация о текущем админе' })
    async checkSession(@GetCurrentAdmin() admin: Admin): Promise<any> {
        return {
            admin: {
                id: admin.id,
                login: admin.login,
            }
        };
    }


}



