import type { ChartTopArtistResponse } from '../../@types';
import { createOptions } from '../createOptions';
import request from '../request';

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
