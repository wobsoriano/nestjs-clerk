import type { ClerkClient } from '@clerk/backend';
import { constants, AuthStatus } from '@clerk/backend/internal';
import { Injectable, type NestMiddleware } from '@nestjs/common';
import type {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction,
} from 'express';
import { Client } from './decorators';
import type { AuthEntity } from './interfaces';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
	constructor(@Client() private readonly clerkClient: ClerkClient) {}

	async use(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
		const webRequest = this.incomingMessageToRequest(req);
		const requestState = await this.clerkClient.authenticateRequest(webRequest);

		requestState.headers.forEach((value, key) => res.appendHeader(key, value));

		if (requestState.headers.get(constants.Headers.Location)) {
			res.status(307).end();
			return;
		}

		if (requestState.status === AuthStatus.Handshake) {
			return new Error('Clerk: unexpected handshake without redirect');
		}

		req.auth = () => requestState.toAuth();
		next();
	}

	private incomingMessageToRequest(req: ExpressRequest): Request {
		const headers = Object.keys(req.headers).reduce(
			(acc, key) => Object.assign(acc, { [key]: req?.headers[key] }),
			{},
		);
		// @ts-expect-error Optimistic attempt to get the protocol in case
		// req extends IncomingMessage in a useful way. No guarantee
		// it'll work.
		const protocol = req.connection?.encrypted ? 'https' : 'http';
		const dummyOriginReqUrl = new URL(
			req.originalUrl || req.url || '',
			`${protocol}://clerk-dummy`,
		);
		return new Request(dummyOriginReqUrl, {
			method: req.method,
			headers: new Headers(headers),
		});
	}
}

declare global {
	namespace Express {
		interface Request {
			auth: AuthEntity;
		}
	}
}
