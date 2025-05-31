# nestjs-clerk

Unofficial Clerk module for Nestjs.

## Installation

```bash
npm install nestjs-clerk
```

## Usage

Import the `ClerkModule` into the root module and configure it with your Clerk API keys.

```ts
import { Module } from '@nestjs/common';
import { ClerkModule } from 'nestjs-clerk';

@Module({
  imports: [
    ClerkModule.forRoot({
      publishableKey: 'pk_***',
      secretKey: 'sk_***',
    }),
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
  public constructor(@InjectClerkClient() private readonly clerkClient: ClerkClient) {
    async getUser(): string {
      const user = await this.clerkClient.users.getUser('user_id');
      return `Hello, ${user.fullName}!`;
    }
  }
}
```

## License

MIT
