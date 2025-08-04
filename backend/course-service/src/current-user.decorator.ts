import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from './app.guard';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: TokenPayload }>();
    return request.user;
  },
);
