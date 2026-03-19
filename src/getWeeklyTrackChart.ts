import { type WeeklyTrackChartResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get a list of the tracks in a user's weekly track chart on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getWeeklyTrackChart
 * @param method - The Last.fm API method string (`method.user.getWeeklyTrackChart`)
 * @param user - The Last.fm username
 * @param period - The time period for the chart
 * @param limit - Number of results per page
 * @returns The user's weekly track chart
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
