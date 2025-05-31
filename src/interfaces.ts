import type { ClerkOptions } from '@clerk/backend';
import type {
	SignedInAuthObject,
	SignedOutAuthObject,
} from '@clerk/backend/internal';
import type { ModuleMetadata, Type } from '@nestjs/common';
export type AuthEntity = () => SignedInAuthObject | SignedOutAuthObject;

export interface ClerkOptionsFactory {
	createClerkOptions(): ClerkOptions | Promise<ClerkOptions>;
}

export interface ClerkAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	inject?: any[];
	useClass?: Type<ClerkOptionsFactory>;
	useExisting?: Type<ClerkOptionsFactory>;
	useFactory?: (...args: any[]) => ClerkOptions | Promise<ClerkOptions>;
}
