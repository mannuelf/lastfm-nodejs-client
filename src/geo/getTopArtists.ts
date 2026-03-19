import type { GeoTopArtistsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the most popular artists on Last.fm by country.
 *
 * @see https://www.last.fm/api/show/geo.getTopArtists
 * @param method - The Last.fm API method string (`method.geo.getTopArtists`)
 * @param country - Country name as defined by the ISO 3166-1 standard
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated list of top artists for the given country
 */
export async function geoGetTopArtists(method: string, country: string, limit = '50', page = '1'): Promise<GeoTopArtistsResponse> {
  return await request<GeoTopArtistsResponse>({ method, country, limit, page });
}
