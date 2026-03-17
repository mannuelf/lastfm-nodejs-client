import type { TrackSimilarResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function trackGetSimilar(method: string, artist: string, track: string, limit = '30', autocorrect = '1'): Promise<TrackSimilarResponse> {
  return await request<TrackSimilarResponse>({ method, artist, track, limit, autocorrect });
}
