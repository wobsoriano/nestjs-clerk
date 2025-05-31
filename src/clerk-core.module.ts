import { type DynamicModule, Global, Module, type Provider } from '@nestjs/common';
import { CLERK_CLIENT_TOKEN } from './clerk.constants';
import { type ClerkClient, type ClerkOptions, createClerkClient } from '@clerk/backend';

@Global()
@Module({})
export class ClerkCoreModule {
  public static forRoot(options: ClerkOptions): DynamicModule {
    const clerkClient: Provider<ClerkClient> = {
      provide: CLERK_CLIENT_TOKEN,
      useValue: createClerkClient(options),
    };

    return {
      exports: [clerkClient],
      module: ClerkCoreModule,
      providers: [clerkClient],
    };
  }
}
