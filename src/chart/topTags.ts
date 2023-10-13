import type { TagsResponse } from '../lastfm.types';
import { createOptions } from '../createOptions';
import request from '../request';

export async function chartTopTags(method: string, page: string): Promise<TagsResponse> {
  const options = createOptions(method, page);
  return await request<TagsResponse>(options);
}
