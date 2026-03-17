import type { TagInfoResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function tagGetInfo(method: string, tag: string, lang = 'en'): Promise<TagInfoResponse> {
  return await request<TagInfoResponse>({ method, tag, lang });
}
