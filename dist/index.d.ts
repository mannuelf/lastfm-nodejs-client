import { AuthResponse, LovedTracksResponse, RecentTracksResponse, TopAlbumsResponse, TopArtistsResponse, TopTrackResponse, UserResponse, WeeklyAlbumChartResponse, WeeklyArtistChartResponse, WeeklyChartListResponse, WeeklyTrackChartResponse } from './types';
declare function LastFmApi(): {
    auth: (method: string, user: string, period: string, limit: number) => Promise<AuthResponse>;
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
    getInfo: (method: string, user: string, period: string, limit: number) => Promise<UserResponse>;
    getLovedTracks: (method: string, user: string, period: string, limit: number) => Promise<LovedTracksResponse>;
    getRecentTracks: (method: string, user: string, period: string, limit: number) => Promise<RecentTracksResponse>;
    getTopAlbums: (method: string, user: string, period: string, limit: number) => Promise<TopAlbumsResponse>;
    getTopArtists: (method: string, user: string, period: string, limit: number) => Promise<TopArtistsResponse>;
    getTopTracks: (method: string, user: string, period: string, limit: number) => Promise<TopTrackResponse>;
    getWeeklyAlbumChart: (method: string, user: string, period: string, limit: number) => Promise<WeeklyAlbumChartResponse>;
    getWeeklyArtistChart: (method: string, user: string, period: string, limit: number) => Promise<WeeklyArtistChartResponse>;
    getWeeklyChartList: (method: string, user: string, period: string, limit: number) => Promise<WeeklyChartListResponse>;
    getWeeklyTrackChart: (method: string, user: string, period: string, limit: number) => Promise<WeeklyTrackChartResponse>;
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
export default LastFmApi;
