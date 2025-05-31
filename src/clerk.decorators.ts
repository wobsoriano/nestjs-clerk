import { createParamDecorator, type ExecutionContext, Inject } from '@nestjs/common';
import { CLERK_CLIENT_TOKEN } from './clerk.constants';

export function InjectClerkClient() {
  return Inject(CLERK_CLIENT_TOKEN);
}

export function Client() {
  return Inject(CLERK_CLIENT_TOKEN);
}

export const Auth = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.auth;
  },
);
