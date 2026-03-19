import { type WeeklyArtistChartResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get a list of the artists in a user's weekly artist chart on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getWeeklyArtistChart
 * @param method - The Last.fm API method string (`method.user.getWeeklyArtistChart`)
 * @param user - The Last.fm username
 * @param period - The time period for the chart
 * @param limit - Number of results per page
 * @returns The user's weekly artist chart
 */
export async function getWeeklyArtistChart(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<WeeklyArtistChartResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<WeeklyArtistChartResponse>(options);
}
