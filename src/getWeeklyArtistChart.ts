import { WeeklyArtistChartResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Weekly artist chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyArtistChart
 * @returns Weekly artist chart
 */
export function getWeeklyArtistChart(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyArtistChartResponse> {
  const options = createOptions(method, user, period, limit);
  return request<WeeklyArtistChartResponse>(options);
}
