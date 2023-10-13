import type { TopTrackResponse } from '../lastfm.types';
import { createOptions } from '../createOptions';
import request from '../request';

export async function chartTopTracks(method: string, page: string): Promise<TopTrackResponse> {
  const options = createOptions(method, page);
  return await request<TopTrackResponse>(options);
}
