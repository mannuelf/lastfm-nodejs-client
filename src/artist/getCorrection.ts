import type { ArtistCorrectionResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetCorrection(method: string, artist: string): Promise<ArtistCorrectionResponse> {
  return await request<ArtistCorrectionResponse>({ method, artist });
}
