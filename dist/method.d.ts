interface UserMethod {
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
}
export interface Method {
    auth: string;
    user: UserMethod;
}
declare const _default: {
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
export default _default;
