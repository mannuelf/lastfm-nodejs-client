import { type WeeklyTrackChartResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: Weekly track chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyTrackChart
 * @returns Weekly track chart
 */
export async function getWeeklyTrackChart(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyTrackChartResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<WeeklyTrackChartResponse>(options);
}
