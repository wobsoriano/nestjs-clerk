import type { ClerkOptions } from '@clerk/backend';
import type {
	DynamicModule,
	MiddlewareConsumer,
	NestModule,
} from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClerkCoreModule } from './core-module';
import type { ClerkAsyncOptions } from './interfaces';
import { ClerkMiddleware } from './middleware';

@Module({})
export class ClerkModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(ClerkMiddleware).forRoutes('*');
	}

	public static forRoot(options: ClerkOptions): DynamicModule {
		return {
			module: ClerkModule,
			imports: [ClerkCoreModule.forRoot(options)],
		};
	}

	public static forRootAsync(options: ClerkAsyncOptions): DynamicModule {
		return {
			module: ClerkModule,
			imports: [ClerkCoreModule.forRootAsync(options)],
		};
	}
}
