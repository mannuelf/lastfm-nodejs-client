import type { TrackTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function trackGetTags(method: string, artist: string, track: string, user: string, autocorrect = '1'): Promise<TrackTagsResponse> {
  return await request<TrackTagsResponse>({ method, artist, track, user, autocorrect });
}
