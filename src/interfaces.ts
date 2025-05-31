import type { ClerkOptions } from '@clerk/backend';
import type {
	SignedInAuthObject,
	SignedOutAuthObject,
} from '@clerk/backend/internal';
import type { ModuleMetadata } from '@nestjs/common';
export type AuthEntity = () => SignedInAuthObject | SignedOutAuthObject;

export interface ClerkAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	inject?: any[];
	useFactory: (...args: any[]) => ClerkOptions | Promise<ClerkOptions>;
}
