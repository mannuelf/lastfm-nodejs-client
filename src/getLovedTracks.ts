import { LovedTracksResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Love Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getLovedTracks
 * @returns Loved Tracks;
 */
export function getLovedTracks(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<LovedTracksResponse> {
  const options = createOptions(method, user, period, limit);
  return request<LovedTracksResponse>(options);
}