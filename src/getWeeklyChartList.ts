import { WeeklyChartListResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Weekly chart list - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyChartList
 * @returns Weekly chart list
 */
export function getWeeklyChartList(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyChartListResponse> {
  const options = createOptions(method, user, period, limit);
  return request<WeeklyChartListResponse>(options);
}
