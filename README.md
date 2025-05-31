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
import { ClerkModule } from 'nestjs-clerk';

@Module({
  imports: [
    ClerkModule.forRoot({
      publishableKey: '',
      secretKey: '',
    }),
  ],
})
export class AppModule {}
```

## Decorators

```ts
import { Get } from '@nestjs/common';
import { Auth, Client } from 'nestjs-clerk';
import type { AuthEntity, ClerkClient } from 'nestjs-clerk';

export class CatsController {
  constructor(@Client() private readonly clerkClient: ClerkClient) {}

  @Get('/user')
  async findAll(@Auth() auth: AuthEntity): Promise<string> {
    const user = this.clerkClient.users.getUser(auth().userId);
    return `Welcome, ${user.firstName} ${user.lastName}!`;
  }
}
```

Here are the decorators you can use into any of your injectables:

- `@Auth()`: Injects the [Auth](https://clerk.com/docs/references/backend/types/auth-object) object.
- `@Client()`: Injects an instance of the Clerk [JavaScript Backend SDK](https://clerk.com/docs/references/backend/overview).

## License

MIT
