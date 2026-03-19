import type { TrackCorrectionResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Use the Last.fm corrections data to check whether the supplied track has a correction
 * to a canonical track and artist name.
 *
 * @see https://www.last.fm/api/show/track.getCorrection
 * @param method - The Last.fm API method string (`method.track.getCorrection`)
 * @param artist - The artist name
 * @param track - The track name to check for a correction
 * @returns The corrected canonical track and artist name if one exists
 */
export async function trackGetCorrection(method: string, artist: string, track: string): Promise<TrackCorrectionResponse> {
  return await request<TrackCorrectionResponse>({ method, artist, track });
}
