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
};

export interface Method {
  auth: string;
  user: UserMethod;
};

export const method = {
  auth: 'auth.getToken',
  user: {
    getInfo: 'user.getInfo',
    getLovedTracks: 'user.getLovedTracks',
    getRecentTracks: 'user.getRecentTracks',
    getTopAlbums: 'user.getTopAlbums',
    getTopArtists: 'user.getTopArtists',
    getTopTracks: 'user.getTopTracks',
    getWeeklyAlbumChart: 'user.getWeeklyAlbumChart',
    getWeeklyArtistChart: 'user.getWeeklyArtistChart',
    getWeeklyChartList: 'user.getWeeklyChartList',
    getWeeklyTrackChart: 'user.getWeeklyTrackChart',
  },
} satisfies Method;
