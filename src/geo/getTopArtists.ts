import type { GeoTopArtistsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function geoGetTopArtists(method: string, country: string, limit = '50', page = '1'): Promise<GeoTopArtistsResponse> {
  return await request<GeoTopArtistsResponse>({ method, country, limit, page });
}
