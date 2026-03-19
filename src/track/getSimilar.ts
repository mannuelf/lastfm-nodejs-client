import type { TrackSimilarResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the similar tracks for this track on Last.fm, based on listening data.
 *
 * @see https://www.last.fm/api/show/track.getSimilar
 * @param method - The Last.fm API method string (`method.track.getSimilar`)
 * @param artist - The artist name
 * @param track - The track name
 * @param limit - Maximum number of similar tracks to return (default `'30'`)
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns A list of similar tracks with match scores
 */
export async function trackGetSimilar(method: string, artist: string, track: string, limit = '30', autocorrect = '1'): Promise<TrackSimilarResponse> {
  return await request<TrackSimilarResponse>({ method, artist, track, limit, autocorrect });
}
