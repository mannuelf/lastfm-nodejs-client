import { type AuthResponse } from "../@types";
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
export declare function auth(method: string, user: string, period: string, limit: string): Promise<AuthResponse>;
//# sourceMappingURL=auth.d.ts.map