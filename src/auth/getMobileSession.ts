import type { AuthMobileSessionResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function authGetMobileSession(method: string, username: string, password: string): Promise<AuthMobileSessionResponse> {
  return await signedRequest<AuthMobileSessionResponse>({ method, username, password }, config.share_secret);
}
