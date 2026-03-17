import type { TrackInfoResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function trackGetInfo(method: string, artist: string, track: string, autocorrect = '1', lang = 'en'): Promise<TrackInfoResponse> {
  return await request<TrackInfoResponse>({ method, artist, track, autocorrect, lang });
}
