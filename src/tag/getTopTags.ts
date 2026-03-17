import type { TagTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function tagGetTopTags(method: string): Promise<TagTopTagsResponse> {
  return await request<TagTopTagsResponse>({ method });
}
