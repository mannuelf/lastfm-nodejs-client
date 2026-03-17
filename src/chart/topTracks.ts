import type { ChartTopTracksResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

export async function chartTopTracks(method: string, page: string): Promise<ChartTopTracksResponse> {
  const options = createOptions(method, page);
  return await request<ChartTopTracksResponse>(options);
}
