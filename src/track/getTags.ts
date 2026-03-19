import type { TrackTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the tags applied by an individual user to a track on Last.fm.
 *
 * @see https://www.last.fm/api/show/track.getTags
 * @param method - The Last.fm API method string (`method.track.getTags`)
 * @param artist - The artist name
 * @param track - The track name
 * @param user - The Last.fm username whose tags to retrieve
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Tags applied by the user to this track
 */
export async function trackGetTags(method: string, artist: string, track: string, user: string, autocorrect = '1'): Promise<TrackTagsResponse> {
  return await request<TrackTagsResponse>({ method, artist, track, user, autocorrect });
}
