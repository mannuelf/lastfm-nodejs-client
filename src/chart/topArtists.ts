import type { ChartTopArtistResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

export async function chartTopArtists(
  method: string,
  user: string,
  period: string,
  page: string,
  limit: string,
): Promise<ChartTopArtistResponse> {
  const options = createOptions(method, user, period, page, limit);
  return await request<ChartTopArtistResponse>(options);
}
