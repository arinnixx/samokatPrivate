import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentAdmin = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return request.session;
    },
);