import type { TrackSearchResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Search for a track by track name, optionally filtered by artist. Returns paginated results.
 *
 * @see https://www.last.fm/api/show/track.search
 * @param method - The Last.fm API method string (`method.track.search`)
 * @param track - The track name to search for
 * @param artist - Optionally narrow results to tracks by this artist
 * @param limit - Number of results per page (default `'30'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated track search results
 */
export async function trackSearch(method: string, track: string, artist?: string, limit = '30', page = '1'): Promise<TrackSearchResponse> {
  return await request<TrackSearchResponse>({ method, track, artist, limit, page });
}
