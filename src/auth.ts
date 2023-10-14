import { type AuthResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * POST: Auth - LastFM
 *
 * https://www.last.fm/api/show/auth.getToken
 *
 * Authentication tokens are API account specific.
 * They are valid for 60 minutes from the moment they are granted.
 * Can only used once (they are consumed when a session is created).
 * @returns Auth token
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
