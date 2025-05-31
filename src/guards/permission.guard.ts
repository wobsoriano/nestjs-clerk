import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Permission } from '../decorators';
import type { AuthEntity } from '../interfaces';

@Injectable()
export class PermissionGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const permission = this.reflector.get(Permission, context.getHandler());
		if (!permission) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const auth = request.auth as AuthEntity;
		return auth().has({ permission });
	}
}
