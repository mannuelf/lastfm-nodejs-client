import { type UserResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get information about a user profile on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getInfo
 * @param method - The Last.fm API method string (`method.user.getInfo`)
 * @param user - The Last.fm username
 * @returns User profile information including name, playcount, and registration date
 */
export async function getInfo(method: string, user: string): Promise<UserResponse> {
  const options = createOptions(method, user);
  return await request<UserResponse>(options);
}
