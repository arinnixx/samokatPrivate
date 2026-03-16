import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_CONTROLLER } from '../decorators/adminController';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private readonly tokenService: TokenService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const isAdminController = this.reflector.getAllAndOverride<boolean>(IS_ADMIN_CONTROLLER, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isAdminController) {
            return true;
        }
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException();
            }
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException();
            }
            const aggregator = await this.tokenService.verifyToken(token);
            if (!aggregator) {
                throw new UnauthorizedException();
            }
            if (aggregator.token !== token) {
                throw new UnauthorizedException('Токен был отозван или заменен');
            }
            req.session = aggregator;
            req.token = token;
            return true;
        } catch (e) {
            if (e instanceof UnauthorizedException) {
                throw e;
            }
            throw new UnauthorizedException({
                message: 'Ошибка авторизации',
                error: e.message
            });
        }
    }
}
