import type { AuthMobileSessionResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Create a session for a user using their username and password (mobile auth flow).
 *
 * The returned session key can be used for authenticated write operations.
 *
 * @see https://www.last.fm/api/show/auth.getMobileSession
 * @param method - The Last.fm API method string (`method.auth.getMobileSession`)
 * @param username - The Last.fm username
 * @param password - The user's plaintext password
 * @returns A session key valid for write operations
 */
export async function authGetMobileSession(method: string, username: string, password: string): Promise<AuthMobileSessionResponse> {
  return await signedRequest<AuthMobileSessionResponse>({ method, username, password }, config.share_secret);
}
