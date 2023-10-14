import type { TagsResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

export async function chartTopTags(method: string, page: string): Promise<TagsResponse> {
  const options = createOptions(method, page);
  return await request<TagsResponse>(options);
}
