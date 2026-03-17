import type { TrackTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function trackGetTopTags(method: string, artist: string, track: string, autocorrect = '1'): Promise<TrackTopTagsResponse> {
  return await request<TrackTopTagsResponse>({ method, artist, track, autocorrect });
}
