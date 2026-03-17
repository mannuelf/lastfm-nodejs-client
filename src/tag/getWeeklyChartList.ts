import type { TagWeeklyChartListResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function tagGetWeeklyChartList(method: string, tag: string): Promise<TagWeeklyChartListResponse> {
  return await request<TagWeeklyChartListResponse>({ method, tag });
}
