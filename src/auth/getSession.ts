import type { AuthSessionResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function authGetSession(method: string, token: string): Promise<AuthSessionResponse> {
  return await signedRequest<AuthSessionResponse>({ method, token }, config.share_secret);
}
