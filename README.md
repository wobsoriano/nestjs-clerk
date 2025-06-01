# nestjs-clerk

Unofficial Clerk module for Nestjs.

## Installation

```bash
npm install nestjs-clerk
```

## Usage

Retrieve your Backend API key from the [API Keys](https://dashboard.clerk.com/last-active?path=api-keys) screen in your Clerk dashboard and set it as an environment variable in a .env file:

```sh
CLERK_PUBLISHABLE_KEY=pk_*******
CLERK_SECRET_KEY=sk_******
```

Import the `ClerkModule` into the root module.

```ts
import { Module } from '@nestjs/common';
import { ClerkModule, RoleGuard, FeatureGuard, PermissionGuard } from 'nestjs-clerk';
import { APP_GUARD } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClerkModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        publishableKey: configService.get('CLERK_PUBLISHABLE_KEY'),
        secretKey: configService.get('CLERK_SECRET_KEY'),
      }),
    }),
  ],
  // Optional guards
  providers: [
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
    { provide: APP_GUARD, useClass: FeatureGuard },
  ],
})
export class AppModule {}
```

## Decorators

```ts
import { Get } from '@nestjs/common';
import { Auth, Client } from 'nestjs-clerk';
import type { AuthEntity, ClerkClient } from 'nestjs-clerk';

export class AppController {
  constructor(@Client() private readonly clerkClient: ClerkClient) {}

  @Get('/user')
  async findAll(@Auth() auth: AuthEntity): Promise<string> {
    const user = this.clerkClient.users.getUser(auth().userId);
    return `Welcome, ${user.firstName} ${user.lastName}!`;
  }
}
```

Here are the decorators you can use into any of your injectables:

- `@Auth()`: [Auth](https://clerk.com/docs/references/backend/types/auth-object) object.
- `@Client()`: Instance of the Clerk [JavaScript Backend SDK](https://clerk.com/docs/references/backend/overview).
- `@Role(role)`: Checks if the user has a specific [role](https://clerk.com/docs/organizations/roles-permissions#roles).
- `@Permission(permission)`: Checks if the user has a specific [permission](https://clerk.com/docs/organizations/roles-permissions#permissions).
- `@Feature(feature)`: Check for specific feature. See [Clerk Billing](https://clerk.com/docs/billing/overview).

## License

MIT
