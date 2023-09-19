import { WeeklyTrackChartResponse } from '../@types';
/**
 * GET: Weekly track chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyTrackChart
 * @returns Weekly track chart
 */
export declare function getWeeklyTrackChart(method: string, user: string, period: string, limit: string): Promise<WeeklyTrackChartResponse>;
