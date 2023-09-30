import { auth } from './auth';
import { getInfo } from './getInfo';
import { getLovedTracks } from './getLovedTracks';
import { getRecentTracks } from './getRecentTracks';
import { getTopAlbums } from './getTopAlbums';
import { getTopArtists } from './getTopArtists';
import { getTopTracks } from './getTopTracks';
import { getWeeklyAlbumChart } from './getWeeklyAlbumChart';
import { getWeeklyArtistChart } from './getWeeklyArtistChart';
import { getWeeklyChartList } from './getWeeklyChartList';
import { getWeeklyTrackChart } from './getWeeklyTrackChart';
import { chartTopTags } from './chart/topTags';
import { chartTopTracks } from './chart/topTracks';
import { chartTopArtists } from './chart/topArtists';
declare const LastFmApi: () => {
    auth: typeof auth;
    chart: {
        chartTopArtists: typeof chartTopArtists;
        chartTopTracks: typeof chartTopTracks;
        chartTopTags: typeof chartTopTags;
    };
    config: {
        api_key: string;
        app_name: string;
        base_url: string;
        format: {
            json: string;
            xml: string;
        };
        share_secret: string;
        username: string;
    };
    getInfo: typeof getInfo;
    getLovedTracks: typeof getLovedTracks;
    getRecentTracks: typeof getRecentTracks;
    getTopAlbums: typeof getTopAlbums;
    getTopArtists: typeof getTopArtists;
    getTopTracks: typeof getTopTracks;
    getWeeklyAlbumChart: typeof getWeeklyAlbumChart;
    getWeeklyArtistChart: typeof getWeeklyArtistChart;
    getWeeklyChartList: typeof getWeeklyChartList;
    getWeeklyTrackChart: typeof getWeeklyTrackChart;
    method: {
        auth: string;
        chart: {
            getTopTracks: string;
            getTopTags: string;
            getTopArtists: string;
        };
        user: {
            getInfo: string;
            getLovedTracks: string;
            getRecentTracks: string;
            getTopAlbums: string;
            getTopArtists: string;
            getTopTracks: string;
            getWeeklyAlbumChart: string;
            getWeeklyArtistChart: string;
            getWeeklyChartList: string;
            getWeeklyTrackChart: string;
        };
    };
};
export default LastFmApi;
//# sourceMappingURL=index.d.ts.map