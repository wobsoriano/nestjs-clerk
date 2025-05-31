import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Role } from '../decorators';
import type { AuthEntity } from '../interfaces';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const role = this.reflector.get(Role, context.getHandler());
		if (!role) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const auth = request.auth as AuthEntity;
		return auth().has({ role });
	}
}
