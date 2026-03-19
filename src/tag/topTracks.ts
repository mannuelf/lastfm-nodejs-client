import type { TagTopTracksResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top tracks tagged with a given tag on Last.fm, ordered by tag count.
 *
 * @see https://www.last.fm/api/show/tag.getTopTracks
 * @param method - The Last.fm API method string (`method.tag.getTopTracks`)
 * @param tag - The tag name
 * @param limit - Number of results to return
 * @returns Top tracks for the given tag ordered by tag count
 */
export async function tagTopTracks(
  method: string,
  tag: string,
  limit: string,
): Promise<TagTopTracksResponse> {
  return await request<TagTopTracksResponse>({ method, tag, limit });
}
