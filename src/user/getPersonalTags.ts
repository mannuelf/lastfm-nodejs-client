import type { UserPersonalTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function userGetPersonalTags(method: string, user: string, tag: string, taggingtype: string, limit = '50', page = '1'): Promise<UserPersonalTagsResponse> {
  return await request<UserPersonalTagsResponse>({ method, user, tag, limit, page });
}
