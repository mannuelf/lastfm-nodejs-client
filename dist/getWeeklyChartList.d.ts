import { WeeklyChartListResponse } from '../@types';
/**
 * GET: Weekly chart list - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyChartList
 * @returns Weekly chart list
 */
export declare function getWeeklyChartList(method: string, user: string, period: string, limit: string): Promise<WeeklyChartListResponse>;
