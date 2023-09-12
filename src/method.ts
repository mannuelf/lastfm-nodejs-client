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
};

export interface Method {
  auth: string;
  user: UserMethod;
};

export default {
  auth: 'auth.getToken',
  user: {
    getInfo: 'user.getInfo',
    loved_tracks: 'user.getLovedTracks',
    recent_tracks: 'user.getRecentTracks',
    top_albums: 'user.getTopAlbums',
    top_artists: 'user.getTopArtists',
    top_tracks: 'user.getTopTracks',
    weekly_album_chart: 'user.getWeeklyAlbumChart',
    weekly_artist_chart: 'user.getWeeklyArtistChart',
    weekly_chart_list: 'user.getWeeklyChartList',
    weekly_track_chart: 'user.getWeeklyTrackChart',
  },
} satisfies Method;
