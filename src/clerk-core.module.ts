import { type DynamicModule, Global, Module, type Provider } from '@nestjs/common';
import { CLERK_CLIENT_TOKEN } from './clerk.constants';
import { type ClerkOptions, createClerkClient } from '@clerk/backend';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({})
export class ClerkCoreModule {
  public static forRoot(options?: ClerkOptions): DynamicModule {
    const clerkClient: Provider = {
      provide: CLERK_CLIENT_TOKEN,
      useFactory: (configService: ConfigService) => {
        return createClerkClient({
          publishableKey:
            options?.publishableKey ??
            configService.get('CLERK_PUBLISHABLE_KEY'),
          secretKey:
            options?.secretKey ?? configService.get('CLERK_SECRET_KEY'),
          jwtKey: options?.secretKey ?? configService.get('CLERK_JWT_KEY'),
          apiUrl:
            options?.apiUrl ??
            configService.get('CLERK_API_URL') ??
            'https://api.clerk.com',
          apiVersion:
            options?.apiVersion ??
            configService.get('CLERK_API_VERSION') ??
            'v1',
          domain: options?.domain ?? configService.get('CLERK_DOMAIN') ?? '',
        });
      },
      inject: [ConfigService],
    };

    return {
      exports: [clerkClient],
      module: ClerkCoreModule,
      providers: [clerkClient],
    };
  }
}
