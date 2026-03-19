import { type AuthResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Fetch an unauthenticated token for the web auth flow.
 *
 * Tokens are API-account-specific, valid for 60 minutes, and consumed
 * once a session is created via `auth.getSession`.
 *
 * @see https://www.last.fm/api/show/auth.getToken
 * @param method - The Last.fm API method string (`method.auth.getToken`)
 * @param user - The Last.fm username
 * @param period - The time period parameter
 * @param limit - The limit parameter
 * @returns An unauthenticated token to redirect the user to the Last.fm auth page
 */
export async function auth(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<AuthResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<AuthResponse>(options);
}
