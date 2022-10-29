const config = {
  api_key: `${process.env.LASTFM_API_KEY}`,
  app_name: `${process.env.LASTFM_APPNAME}`,
  base_url: `${process.env.LASTFM_API_BASE_URL}`,
  format: {
    json: 'json',
    xml: 'xml',
  },
  methods: {
    auth: {
      token: 'auth.getToken',
    },
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
  },
  registered_to: `${process.env.LASTFM_USER}`,
  share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
  user: `${process.env.LASTFM_USER}`,
};

export const AUTH_URL = `${config.base_url}?method=${config.methods.auth.token}&api_key=${config.api_key}&format=${config.format.json}`;
export const LOVED_TRACKS_URL = `${config.base_url}?method=${config.methods.user.loved_tracks}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const RECENT_TRACKS_URL = `${config.base_url}?method=${config.methods.user.recent_tracks}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const TOP_ALBUMS_URL = `${config.base_url}?method=${config.methods.user.top_albums}&user=${config.user}&api_key=${config.api_key}&format=${config.format.json}`;
export const TOP_ARTIST_URL = `${config.base_url}?method=${config.methods.user.top_artists}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const TOP_TRACKS = `${config.base_url}?method=${config.methods.user.top_tracks}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const USER_URL = `${config.base_url}?method=${config.methods.user.getInfo}&user=${config.user}&api_key=${config.api_key}&format=${config.format.json}`;
export const WEEKLY_ALBUM_CHART_URL = `${config.base_url}?method=${config.methods.user.weekly_album_chart}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const WEEKLY_ARTIST_CHART_URL = `${config.base_url}?method=${config.methods.user.weekly_chart_list}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const WEEKLY_CHART_LIST_URL = `${config.base_url}?method=${config.methods.user.weekly_chart_list}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;
export const WEEKLY_TRACK_CHART_URL = `${config.base_url}?method=${config.methods.user.weekly_track_chart}&user=${config.user}&limit=20&api_key=${config.api_key}&format=${config.format.json}`;

export default config;
