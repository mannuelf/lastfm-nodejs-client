import { type WeeklyAlbumChartResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: Weekly album chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyAlbumChart
 * @returns Weekly album chart
 */
export async function getWeeklyAlbumChart(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyAlbumChartResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<WeeklyAlbumChartResponse>(options);
}
