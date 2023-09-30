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

export const method = {
  auth: 'auth.getToken',
  chart: {
    getTopTracks: 'chart.getTopTracks',
    getTopTags: 'chart.getTopTags',
    getTopArtists: 'chart.getTopArtists',
  },
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
