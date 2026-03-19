import type { ChartTopArtistResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

/**
 * Get the top artists chart on Last.fm.
 *
 * @see https://www.last.fm/api/show/chart.getTopArtists
 * @param method - The Last.fm API method string (`method.chart.getTopArtists`)
 * @param user - The Last.fm username
 * @param period - The time period over which to retrieve the chart
 * @param page - Page number to fetch
 * @param limit - Number of results per page
 * @returns Paginated list of the most popular artists globally
 */
export async function chartTopArtists(
  method: string,
  user: string,
  period: string,
  page: string,
  limit: string,
): Promise<ChartTopArtistResponse> {
  const options = createOptions(method, user, period, page, limit);
  return await request<ChartTopArtistResponse>(options);
}
