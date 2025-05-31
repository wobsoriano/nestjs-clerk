import { type ClerkOptions, createClerkClient } from '@clerk/backend';
import {
	type DynamicModule,
	Global,
	Module,
	type Provider,
} from '@nestjs/common';
import { CLERK_CLIENT_OPTIONS, CLERK_CLIENT_TOKEN } from './constants';
import type { ClerkAsyncOptions, ClerkOptionsFactory } from './interfaces';

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

		return {
			exports: [clerkClient],
			imports: asyncOptions.imports,
			module: ClerkCoreModule,
			providers: [...ClerkCoreModule.createAsyncProviders(asyncOptions), clerkClient],
		};
	}

	private static createAsyncProviders(options: ClerkAsyncOptions): Provider[] {
		if (options.useExisting || options.useFactory) {
			return [ClerkCoreModule.createAsyncOptionsProvider(options)];
		}

		return [
			ClerkCoreModule.createAsyncOptionsProvider(options),
			{
				provide: options.useClass!,
				useClass: options.useClass!,
			},
		];
	}

	private static createAsyncOptionsProvider(
		options: ClerkAsyncOptions,
	): Provider {
		if (options.useFactory) {
			return {
				inject: options.inject || [],
				provide: CLERK_CLIENT_OPTIONS,
				useFactory: options.useFactory,
			};
		}

		return {
			inject: [options.useExisting || options.useClass!],
			provide: CLERK_CLIENT_OPTIONS,
			useFactory: (optionsFactory: ClerkOptionsFactory) =>
				optionsFactory.createClerkOptions(),
		};
	}
}
