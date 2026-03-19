import type { TagWeeklyChartListResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get a list of available charts for this tag, expressed as date ranges which can be
 * sent to the chart services.
 *
 * @see https://www.last.fm/api/show/tag.getWeeklyChartList
 * @param method - The Last.fm API method string (`method.tag.getWeeklyChartList`)
 * @param tag - The tag name
 * @returns A list of date ranges representing available weekly charts for this tag
 */
export async function tagGetWeeklyChartList(method: string, tag: string): Promise<TagWeeklyChartListResponse> {
  return await request<TagWeeklyChartListResponse>({ method, tag });
}
