import type { ArtistTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetTags(method: string, artist: string, user: string, autocorrect = '1'): Promise<ArtistTagsResponse> {
  return await request<ArtistTagsResponse>({ method, artist, user, autocorrect });
}
