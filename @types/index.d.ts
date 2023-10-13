export interface AuthResponse {
  token: string;
}

export interface LovedTracksResponse {
  lovedtracks: LovedTracks;
}

export interface LovedTracks {
  track: Track[];
  '@attr': AttrNowPlaying;
}
export interface TopAlbumsResponse {
  topalbums: TopAlbums;
}

export interface TopTrackResponse {
  toptracks: TopTracks;
}

export interface TopTracks {
  track: Track[];
  '@attr': AttrLimit;
}

export interface UserResponse {
  user: User;
}

export interface RecentTracksResponse {
  recenttracks: RecentTracks;
}

export interface RecentTracks {
  track: Track[];
  '@attr': AttrLimit;
}

export interface TagsResponse {
  tag: Tag[];
  '@attr': Attr;
}

export interface Tag {
  name: string;
  url: string;
  reach: string;
  taggings: string;
  streamable: string;
  wiki: Wiki;
}

export interface Wiki {}

export interface LoveTracksResponse {
  lovedtracks: LovedTracks;
}

export interface LovedTracks {
  track: Track[];
  '@attr': AttrNowPlaying;
}
export interface FriendsResponse {
  friends: Friends;
}

export interface Friends {
  '@attr': AttrNowPlaying;
  user: User[];
}

export interface ChartTopArtistResponse {
  artists: Artist[];
  '@attr': AttributesPage;
}
export interface TopArtistsResponse {
  topartists: TopArtists;
}

export interface TopArtists {
  artist: Artist[];
  '@attr': AttrLimit;
}

export interface WeeklyArtistChartResponse {
  weeklyartistchart: WeeklyArtistChart;
}

export interface WeeklyArtistChart {
  artist: Artist[];
  '@attr': AttrLimit;
}

export interface WeeklyAlbumChartResponse {
  weeklyalbumchart: WeeklyAlbumChart;
}

export interface WeeklyAlbumChart {
  album: WeeklyAlbum[];
  '@attr': WeeklyalbumChartAttr;
}

export interface WeeklyAlbum {
  artist: {
    mbid: string;
    '#text': string;
  };
  mbid: string;
  url: string;
  name: string;
  '@attr': { rank: string };
  playcount: string;
  image?: string;
}

export interface WeeklyalbumChartAttr {
  from: string;
  to: string;
  user: string;
}

export interface AlbumAttr {
  rank: string;
}

export type Artist = {
  '@attr': {
    rank: number;
  };
  cover: ArtistImage;
  image?: Image[];
  mbid: string;
  name: string;
  playcount: number;
  streamable: number;
  url: string;
  '#text': string;
};

export interface AttributesPage {
  page: number;
  perPage: number;
  user: string;
  total: number;
  totalPages: number;
}

export interface ArtistImage {
  name: string;
  photo: string;
  attribution: string;
  playcount: number;
}

export interface Album extends Track {
  album: Album;
  artist: Artist;
  name: string;
  url: string;
}

export interface AttrNowPlaying {
  nowplaying: string;
}

export interface Date {
  uts: string;
  '#text': string;
}

export interface Track {
  '@attr'?: AttrRank;
  album: Album;
  artist: Artist;
  date?: Date;
  duration?: string;
  image?: Image[];
  mbid: string;
  name: string;
  playcount?: string;
  streamable?: string;
  url: string;
}

export interface AttrLimit {
  user?: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface RecentTracks {
  track: Track[];
  '@attr': AttrLimit;
}

export interface Image {
  size: string;
  '#text': string;
}

export interface Registered {
  unixtime: string;
  '#text': number;
}

export interface User {
  name: string;
  age: string;
  subscriber: string;
  realname: string;
  bootstrap: string;
  playcount: string;
  artist_count: string;
  playlists: string;
  track_count: string;
  album_count: string;
  image: Image[];
  registered: Registered;
  country: string;
  gender: string;
  url: string;
  type: string;
}

export interface TopAlbums {
  album: Album[];
  '@attr': AttrLimit;
}

export interface WeeklyArtistChartResponse {
  weeklyartistchart: WeeklyArtistChart;
}

export interface WeeklyArtistChart {
  artist: Artist[];
  '@attr': AttrLimit;
}

export interface AttrRank {
  rank?: string;
}

export interface AttrLimit {
  from: string;
  user?: string;
  to: string;
}

export interface WeeklyChartListResponse {
  weeklychartlist: WeeklyChartList;
}

export interface WeeklyChartList {
  chart: WeeklyChartListChart[];
  '@attr': WeeklyChartListAttr;
}

export interface WeeklyChartListChart {
  '#text': string;
  from: string;
  to: string;
}

export interface WeeklyChartListAttr {
  user: string;
}

export interface WeeklyTrackChartResponse {
  weeklytrackchart: WeeklyTrackChart;
}

export interface WeeklyTrackChart {
  track: Track[];
  '@attr': AttrLimit;
}

export interface WeeklyTrackChartTrack {
  artist: WeeklyTrackChartArtist;
  image: Image[];
  mbid: string;
  url: string;
  name: string;
  '@attr': AttrNowPlaying;
  playcount: string;
}

export interface WeeklyTrackChartArtist {
  mbid: string;
  '#text': string;
}

export enum ErrorResponse {
  InvalidService = 2,
  InvalidMethod = 3,
  AuthenticationFailed = 4,
  InvalidFormat = 5,
  InvalidParameters = 6,
  InvalidResource = 7,
  OperationFailed = 8,
  InvalidSessionKey = 9,
  InvalidAPIKey = 10,
  ServiceOffline = 11,
  InvalidMethodSignature = 13,
  TemporaryError = 16,
  SuspendedAPIKey = 26,
  RateLimitExceeded = 29,
}
