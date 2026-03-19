import type { TrackInfoResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the metadata for a track on Last.fm. Includes wiki text, tags, and similar tracks.
 *
 * @see https://www.last.fm/api/show/track.getInfo
 * @param method - The Last.fm API method string (`method.track.getInfo`)
 * @param artist - The artist name
 * @param track - The track name
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @param lang - ISO 639 alpha-2 language code for the wiki text (default `'en'`)
 * @returns Track metadata including duration, play count, wiki, and top tags
 */
export async function trackGetInfo(method: string, artist: string, track: string, autocorrect = '1', lang = 'en'): Promise<TrackInfoResponse> {
  return await request<TrackInfoResponse>({ method, artist, track, autocorrect, lang });
}
