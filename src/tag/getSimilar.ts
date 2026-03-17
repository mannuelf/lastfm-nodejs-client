import type { TagSimilarResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function tagGetSimilar(method: string, tag: string): Promise<TagSimilarResponse> {
  return await request<TagSimilarResponse>({ method, tag });
}
