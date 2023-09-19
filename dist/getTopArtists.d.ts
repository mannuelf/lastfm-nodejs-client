import { TopArtistsResponse } from '../@types';
/**
 * GET: Top Artist - LastFM
 *
 * https://www.last.fm/api/show/user.getTopArtists
 * @returns Top Artists
 */
export declare function getTopArtists(method: string, user: string, period: string, limit: string): Promise<TopArtistsResponse>;
