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
export default function LastFmApi(): {
    auth: typeof auth;
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
        user: {
            getInfo: string;
            loved_tracks: string;
            recent_tracks: string;
            top_albums: string;
            top_artists: string;
            top_tracks: string;
            weekly_album_chart: string;
            weekly_artist_chart: string;
            weekly_chart_list: string;
            weekly_track_chart: string;
        };
    };
};
