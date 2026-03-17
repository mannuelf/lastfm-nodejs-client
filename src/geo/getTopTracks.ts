import type { GeoTopTracksResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function geoGetTopTracks(method: string, country: string, limit = '50', page = '1'): Promise<GeoTopTracksResponse> {
  return await request<GeoTopTracksResponse>({ method, country, limit, page });
}
