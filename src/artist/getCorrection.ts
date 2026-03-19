import type { ArtistCorrectionResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Use the Last.fm corrections data to check whether the supplied artist has a correction
 * to a canonical artist name.
 *
 * @see https://www.last.fm/api/show/artist.getCorrection
 * @param method - The Last.fm API method string (`method.artist.getCorrection`)
 * @param artist - The artist name to check for a correction
 * @returns The corrected canonical artist name if one exists
 */
export async function artistGetCorrection(method: string, artist: string): Promise<ArtistCorrectionResponse> {
  return await request<ArtistCorrectionResponse>({ method, artist });
}
