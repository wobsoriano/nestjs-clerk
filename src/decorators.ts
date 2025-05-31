import {
	type ExecutionContext,
	Inject,
	createParamDecorator,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CLERK_CLIENT_TOKEN } from './constants';

export function Client() {
	return Inject(CLERK_CLIENT_TOKEN);
}

export const Auth = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return request.auth;
	},
);

export const Role = Reflector.createDecorator<string>();

export const Permission = Reflector.createDecorator<string>();
