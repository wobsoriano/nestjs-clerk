import type { Autocomplete, OrganizationCustomRoleKey } from '@clerk/types';
import {
	type ExecutionContext,
	Inject,
	SetMetadata,
	createParamDecorator,
} from '@nestjs/common';
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

export const Role = (role: OrganizationCustomRoleKey) =>
	SetMetadata('role', role);

export const Permission = (permission: string) =>
	SetMetadata('permission', permission);

export const Feature = (feature: Autocomplete<`user:${string}` | `org:${string}`>) =>
	SetMetadata('feature', feature);
