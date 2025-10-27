import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {AggregatorService} from "../aggregator/aggregator.service";
import {Reflector} from "@nestjs/core";
import {IS_ADMIN_CONTROLLER} from "../decorators/adminController";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private aggregateService: AggregatorService,
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
            const res = await this.aggregateService.getBy({token});
            if (!res) {
                throw new UnauthorizedException();
            }
            req.session = res;
            return true;
        } catch (e) {
            throw new UnauthorizedException({
                message: 'Агрегатор не авторизован',
            });
        }
    }
}
