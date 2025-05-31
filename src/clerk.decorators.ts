import { Inject } from '@nestjs/common';
import { CLERK_CLIENT_TOKEN } from './clerk.constants';

export function InjectClerkClient() {
  return Inject(CLERK_CLIENT_TOKEN);
}
