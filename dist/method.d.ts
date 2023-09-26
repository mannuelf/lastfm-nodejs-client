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
    user: UserMethod;
}
export declare const method: {
    auth: string;
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