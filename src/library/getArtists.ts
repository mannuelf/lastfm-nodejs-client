import type { LibraryArtistsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function libraryGetArtists(method: string, user: string, limit = '50', page = '1'): Promise<LibraryArtistsResponse> {
  return await request<LibraryArtistsResponse>({ method, user, limit, page });
}
