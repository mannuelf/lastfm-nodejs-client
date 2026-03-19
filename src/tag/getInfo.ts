import type { TagInfoResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the metadata for a tag on Last.fm. Includes a short wiki summary.
 *
 * @see https://www.last.fm/api/show/tag.getInfo
 * @param method - The Last.fm API method string (`method.tag.getInfo`)
 * @param tag - The tag name
 * @param lang - ISO 639 alpha-2 language code for the wiki text (default `'en'`)
 * @returns Tag metadata including wiki text and reach
 */
export async function tagGetInfo(method: string, tag: string, lang = 'en'): Promise<TagInfoResponse> {
  return await request<TagInfoResponse>({ method, tag, lang });
}
