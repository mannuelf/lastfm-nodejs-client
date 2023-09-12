import { UserResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: User profile information - LastFM
 *
 * https://www.last.fm/api/show/user.getInfo
 * @returns User profile information
 */
export function getInfo(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<UserResponse> {
  const options = createOptions(method, user, period, limit);
  return request<UserResponse>(options);
}
