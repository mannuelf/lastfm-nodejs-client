import type { ChartTopTracksResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

/**
 * Get the top tracks chart on Last.fm.
 *
 * @see https://www.last.fm/api/show/chart.getTopTracks
 * @param method - The Last.fm API method string (`method.chart.getTopTracks`)
 * @param page - Page number to fetch
 * @returns Paginated list of the most popular tracks globally
 */
export async function chartTopTracks(method: string, page: string): Promise<ChartTopTracksResponse> {
  const options = createOptions(method, page);
  return await request<ChartTopTracksResponse>(options);
}
