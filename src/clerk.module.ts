import type {
  DynamicModule,
  MiddlewareConsumer,
  NestModule,
} from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClerkCoreModule } from './clerk-core.module';
import type { ClerkOptions } from '@clerk/backend';
import { ClerkMiddleware } from './clerk.middleware';

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
}
