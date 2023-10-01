interface ChartMethod {
    getTopArtists: string;
    getTopTags: string;
    getTopTracks: string;
}
interface UserMethod {
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
}
export interface Method {
    auth: string;
    chart: ChartMethod;
    user: UserMethod;
}
export declare const method: {
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
export {};
//# sourceMappingURL=method.d.ts.map