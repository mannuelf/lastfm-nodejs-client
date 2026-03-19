import { type WeeklyAlbumChartResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get a list of the albums in a user's weekly album chart on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getWeeklyAlbumChart
 * @param method - The Last.fm API method string (`method.user.getWeeklyAlbumChart`)
 * @param user - The Last.fm username
 * @param period - The time period for the chart
 * @param limit - Number of results per page
 * @returns The user's weekly album chart
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
