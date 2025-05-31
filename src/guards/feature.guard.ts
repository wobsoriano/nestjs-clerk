import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from '@nestjs/common';
import type { Reflector } from '@nestjs/core';
import { Feature } from '../decorators';
import type { AuthEntity } from '../interfaces';

@Injectable()
export class FeatureGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const feature = this.reflector.get(Feature, context.getHandler());
		if (!feature) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const auth = request.auth as AuthEntity;
		return auth().has({ feature });
	}
}
