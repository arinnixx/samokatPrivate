import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class MainGuard implements CanActivate {

    constructor() {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedException();
            }
            const [bearer, token] = authHeader.split(' ');
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException();
            }

            if (token !== process.env.ADMIN_TOKEN) {
                throw new UnauthorizedException();
            }
            // req.session = res;
            return true;
        } catch (e) {
            throw new UnauthorizedException({
                message: 'Неверный роут...',
            });
        }
    }
}
