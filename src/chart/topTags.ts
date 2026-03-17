import type { ChartTopTagsResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

export async function chartTopTags(method: string, page: string): Promise<ChartTopTagsResponse> {
  const options = createOptions(method, page);
  return await request<ChartTopTagsResponse>(options);
}
