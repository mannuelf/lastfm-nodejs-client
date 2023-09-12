import { WeeklyAlbumChartResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Weekly album chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyAlbumChart
 * @returns Weekly album chart
 */
export function getWeeklyAlbumChart(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyAlbumChartResponse> {
  const options = createOptions(method, user, period, limit);
  return request<WeeklyAlbumChartResponse>(options);
}
