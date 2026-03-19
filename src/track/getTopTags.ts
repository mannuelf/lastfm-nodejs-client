import type { TrackTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top tags for a track on Last.fm, ordered by popularity.
 *
 * @see https://www.last.fm/api/show/track.getTopTags
 * @param method - The Last.fm API method string (`method.track.getTopTags`)
 * @param artist - The artist name
 * @param track - The track name
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Top tags for the track ordered by tag count
 */
export async function trackGetTopTags(method: string, artist: string, track: string, autocorrect = '1'): Promise<TrackTopTagsResponse> {
  return await request<TrackTopTagsResponse>({ method, artist, track, autocorrect });
}
