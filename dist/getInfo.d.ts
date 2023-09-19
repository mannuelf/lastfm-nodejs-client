import { UserResponse } from '../@types';
/**
 * GET: User profile information - LastFM
 *
 * https://www.last.fm/api/show/user.getInfo
 * @returns User profile information
 */
export declare function getInfo(method: string, user: string): Promise<UserResponse>;
