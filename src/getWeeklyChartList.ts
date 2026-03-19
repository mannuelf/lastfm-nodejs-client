import { type WeeklyChartListResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get a list of available charts for a user on Last.fm, expressed as date ranges
 * which can be sent to the chart services.
 *
 * @see https://www.last.fm/api/show/user.getWeeklyChartList
 * @param method - The Last.fm API method string (`method.user.getWeeklyChartList`)
 * @param user - The Last.fm username
 * @param period - The time period for the chart list
 * @param limit - Number of results per page
 * @returns A list of date ranges representing available weekly charts for this user
 */
export async function getWeeklyChartList(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyChartListResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<WeeklyChartListResponse>(options);
}
