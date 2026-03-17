import type { TrackSearchResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function trackSearch(method: string, track: string, artist?: string, limit = '30', page = '1'): Promise<TrackSearchResponse> {
  return await request<TrackSearchResponse>({ method, track, artist, limit, page });
}
