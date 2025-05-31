import { type ClerkOptions, createClerkClient } from '@clerk/backend';
import {
	type DynamicModule,
	Global,
	Module,
	type Provider,
} from '@nestjs/common';
import { CLERK_CLIENT_OPTIONS, CLERK_CLIENT_TOKEN } from './constants';
import type { ClerkAsyncOptions } from './interfaces';

@Global()
@Module({})
export class ClerkCoreModule {
	public static forRoot(options: ClerkOptions): DynamicModule {
		const clerkClient: Provider = {
			provide: CLERK_CLIENT_TOKEN,
			useValue: createClerkClient(options),
		};

		return {
			exports: [clerkClient],
			module: ClerkCoreModule,
			providers: [clerkClient],
		};
	}

	public static forRootAsync(asyncOptions: ClerkAsyncOptions): DynamicModule {
		const clerkClient: Provider = {
			inject: [CLERK_CLIENT_OPTIONS],
			provide: CLERK_CLIENT_TOKEN,
			useFactory: (options: ClerkOptions) => createClerkClient(options),
		};

		const optionsProvider: Provider = {
			inject: asyncOptions.inject || [],
			provide: CLERK_CLIENT_OPTIONS,
			useFactory: asyncOptions.useFactory,
		};

		return {
			exports: [clerkClient],
			imports: asyncOptions.imports,
			module: ClerkCoreModule,
			providers: [optionsProvider, clerkClient],
		};
	}
}
