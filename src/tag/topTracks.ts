import type { TagTopTracksResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * GET: Tag Top Tracks - LastFM
 *
 * https://www.last.fm/api/show/tag.getTopTracks
 * @returns Top Tracks for a tag
 */
export async function tagTopTracks(
  method: string,
  tag: string,
  limit: string,
): Promise<TagTopTracksResponse> {
  return await request<TagTopTracksResponse>({ method, tag, limit });
}
