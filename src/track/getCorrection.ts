import type { TrackCorrectionResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function trackGetCorrection(method: string, artist: string, track: string): Promise<TrackCorrectionResponse> {
  return await request<TrackCorrectionResponse>({ method, artist, track });
}
