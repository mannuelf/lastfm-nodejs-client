import type { TopTrackResponse } from '../lastfm.types.js';
import { createOptions } from '../createOptions.js';
import request from '../request.js';

export async function chartTopTracks(method: string, page: string): Promise<TopTrackResponse> {
  const options = createOptions(method, page);
  return await request<TopTrackResponse>(options);
}
