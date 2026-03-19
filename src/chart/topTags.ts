import type { ChartTopTagsResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

/**
 * Get the top tags chart on Last.fm, ordered by tag popularity.
 *
 * @see https://www.last.fm/api/show/chart.getTopTags
 * @param method - The Last.fm API method string (`method.chart.getTopTags`)
 * @param page - Page number to fetch
 * @returns Paginated list of the most popular tags globally
 */
export async function chartTopTags(method: string, page: string): Promise<ChartTopTagsResponse> {
  const options = createOptions(method, page);
  return await request<ChartTopTagsResponse>(options);
}
