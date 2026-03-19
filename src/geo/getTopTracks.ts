import type { GeoTopTracksResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the most popular tracks on Last.fm by country.
 *
 * @see https://www.last.fm/api/show/geo.getTopTracks
 * @param method - The Last.fm API method string (`method.geo.getTopTracks`)
 * @param country - Country name as defined by the ISO 3166-1 standard
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated list of top tracks for the given country
 */
export async function geoGetTopTracks(method: string, country: string, limit = '50', page = '1'): Promise<GeoTopTracksResponse> {
  return await request<GeoTopTracksResponse>({ method, country, limit, page });
}
