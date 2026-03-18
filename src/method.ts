interface AlbumMethod {
  addTags: string;
  getInfo: string;
  getTags: string;
  getTopTags: string;
  removeTag: string;
  search: string;
}

interface ArtistMethod {
  addTags: string;
  getCorrection: string;
  getInfo: string;
  getSimilar: string;
  getTags: string;
  getTopAlbums: string;
  getTopTags: string;
  getTopTracks: string;
  removeTag: string;
  search: string;
}

interface AuthMethod {
  getMobileSession: string;
  getSession: string;
  getToken: string;
}

interface ChartMethod {
  getTopArtists: string;
  getTopTags: string;
  getTopTracks: string;
}

interface GeoMethod {
  getTopArtists: string;
  getTopTracks: string;
}

interface LibraryMethod {
  getArtists: string;
}

interface TagMethod {
  getInfo: string;
  getSimilar: string;
  getTopAlbums: string;
  getTopArtists: string;
  getTopTags: string;
  getTopTracks: string;
  getWeeklyChartList: string;
}

interface TrackMethod {
  addTags: string;
  getCorrection: string;
  getInfo: string;
  getSimilar: string;
  getTags: string;
  getTopTags: string;
  love: string;
  removeTag: string;
  scrobble: string;
  search: string;
  unlove: string;
  updateNowPlaying: string;
}

interface UserMethod {
  getFriends: string;
  getInfo: string;
  getLovedTracks: string;
  getPersonalTags: string;
  getRecentTracks: string;
  getTopAlbums: string;
  getTopArtists: string;
  getTopTags: string;
  getTopTracks: string;
  getWeeklyAlbumChart: string;
  getWeeklyArtistChart: string;
  getWeeklyChartList: string;
  getWeeklyTrackChart: string;
}

export interface Method {
  album: AlbumMethod;
  artist: ArtistMethod;
  auth: AuthMethod;
  chart: ChartMethod;
  geo: GeoMethod;
  library: LibraryMethod;
  tag: TagMethod;
  track: TrackMethod;
  user: UserMethod;
}

export const method: Method = {
  album: {
    addTags: 'album.addTags',
    getInfo: 'album.getInfo',
    getTags: 'album.getTags',
    getTopTags: 'album.getTopTags',
    removeTag: 'album.removeTag',
    search: 'album.search',
  },
  artist: {
    addTags: 'artist.addTags',
    getCorrection: 'artist.getCorrection',
    getInfo: 'artist.getInfo',
    getSimilar: 'artist.getSimilar',
    getTags: 'artist.getTags',
    getTopAlbums: 'artist.getTopAlbums',
    getTopTags: 'artist.getTopTags',
    getTopTracks: 'artist.getTopTracks',
    removeTag: 'artist.removeTag',
    search: 'artist.search',
  },
  auth: {
    getMobileSession: 'auth.getMobileSession',
    getSession: 'auth.getSession',
    getToken: 'auth.getToken',
  },
  chart: {
    getTopTracks: 'chart.getTopTracks',
    getTopTags: 'chart.getTopTags',
    getTopArtists: 'chart.getTopArtists',
  },
  geo: {
    getTopArtists: 'geo.getTopArtists',
    getTopTracks: 'geo.getTopTracks',
  },
  library: {
    getArtists: 'library.getArtists',
  },
  tag: {
    getInfo: 'tag.getInfo',
    getSimilar: 'tag.getSimilar',
    getTopAlbums: 'tag.getTopAlbums',
    getTopArtists: 'tag.getTopArtists',
    getTopTags: 'tag.getTopTags',
    getTopTracks: 'tag.getTopTracks',
    getWeeklyChartList: 'tag.getWeeklyChartList',
  },
  track: {
    addTags: 'track.addTags',
    getCorrection: 'track.getCorrection',
    getInfo: 'track.getInfo',
    getSimilar: 'track.getSimilar',
    getTags: 'track.getTags',
    getTopTags: 'track.getTopTags',
    love: 'track.love',
    removeTag: 'track.removeTag',
    scrobble: 'track.scrobble',
    search: 'track.search',
    unlove: 'track.unlove',
    updateNowPlaying: 'track.updateNowPlaying',
  },
  user: {
    getFriends: 'user.getFriends',
    getInfo: 'user.getInfo',
    getLovedTracks: 'user.getLovedTracks',
    getPersonalTags: 'user.getPersonalTags',
    getRecentTracks: 'user.getRecentTracks',
    getTopAlbums: 'user.getTopAlbums',
    getTopArtists: 'user.getTopArtists',
    getTopTags: 'user.getTopTags',
    getTopTracks: 'user.getTopTracks',
    getWeeklyAlbumChart: 'user.getWeeklyAlbumChart',
    getWeeklyArtistChart: 'user.getWeeklyArtistChart',
    getWeeklyChartList: 'user.getWeeklyChartList',
    getWeeklyTrackChart: 'user.getWeeklyTrackChart',
  },
};
