import { TopTrackResponse } from '../@types';
/**
 * GET: Top Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getTopTracks
 * @returns Top Tracks
 */
export declare function getTopTracks(method: string, user: string, period: string, limit: string): Promise<TopTrackResponse>;
