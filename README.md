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

Import the `ClerkModule` into the root module and configure it with your Clerk API keys.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClerkModule } from 'nestjs-clerk';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClerkModule.forRoot(),
  ],
})
export class AppModule {}
```

Access the `clerkClient` into any of your injectables by using the `@InjectClerkClient` decorator.

```ts
import { Injectable } from '@nestjs/common';
import { InjectClerkClient } from 'nestjs-clerk';
import { ClerkClient } from '@clerk/backend';

@Injectable()
export class AppService {
  public constructor(
    @InjectClerkClient() private readonly clerkClient: ClerkClient
  ) {
    async getUser(): string {
      const user = await this.clerkClient.users.getUser('user_id');
      return `Hello, ${user.fullName}!`;
    }
  }
}
```

## License

MIT
