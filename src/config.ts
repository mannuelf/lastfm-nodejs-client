const config = {
  api_key: `${process.env.LASTFM_API_KEY}`,
  app_name: `${process.env.LASTFM_APPNAME}`,
  base_url: `${process.env.LASTFM_API_BASE_URL}`,
  format: {
    json: 'json',
    xml: 'xml',
  },
  method: {
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
  },
  share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
  username: `${process.env.LASTFM_USER}`,
};

export default config;
