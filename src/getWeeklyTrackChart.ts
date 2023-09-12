import { WeeklyTrackChartResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';


/**
 * GET: Weekly track chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyTrackChart
 * @returns Weekly track chart
 */
export function getWeeklyTrackChart(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyTrackChartResponse> {
  const options = createOptions(method, user, period, limit);
  return request<WeeklyTrackChartResponse>(options);
}