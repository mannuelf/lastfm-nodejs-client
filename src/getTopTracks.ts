import { TopTrackResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Top Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getTopTracks
 * @returns Top Tracks
 */
export function getTopTracks(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<TopTrackResponse> {
  const options = createOptions(method, user, period, limit);
  return request<TopTrackResponse>(options);
}