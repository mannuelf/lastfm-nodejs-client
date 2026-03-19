import type { AuthSessionResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Fetch a session key for a user after they have authorised a token via the Last.fm web auth flow.
 *
 * Tokens are valid for 60 minutes and can only be used once.
 *
 * @see https://www.last.fm/api/show/auth.getSession
 * @param method - The Last.fm API method string (`method.auth.getSession`)
 * @param token - The token previously granted by `auth.getToken` and authorised by the user
 * @returns A session key valid for write operations
 */
export async function authGetSession(method: string, token: string): Promise<AuthSessionResponse> {
  return await signedRequest<AuthSessionResponse>({ method, token }, config.share_secret);
}
