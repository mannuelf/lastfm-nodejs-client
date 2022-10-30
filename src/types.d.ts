export interface AuthResponse {
  token: string;
}

export interface LovedTracksResponse {
  lovedtracks: LovedTracks;
}

export interface LovedTracks {
  track: Track[];
  '@attr': Attr;
}
export interface TopAlbumsResponse {
  topalbums: TopAlbums;
}

export interface TopTrackResponse {
  toptracks: TopTracks;
}

export interface TopTracks {
  track: Track[];
  '@attr': Attr2;
}

export interface UserResponse {
  user: User;
}

export interface RecentTracksResponse {
  recenttracks: RecentTracks;
}

export interface RecentTracks {
  track: Track[];
  '@attr': Attr2;
}

export interface LoveTracksResponse {
  lovedtracks: LovedTracks;
}

export interface LovedTracks {
  track: Track[];
  '@attr': Attr;
}
export interface FriendsResponse {
  friends: Friends;
}

export interface Friends {
  '@attr': Attr;
  user: User[];
}

export interface TopArtistsResponse {
  topartists: TopArtists;
}

export interface TopArtists {
  artist: Artist[];
  '@attr': Attr2;
}

export interface WeeklyArtistChartResponse {
  weeklyartistchart: WeeklyArtistChart;
}

export interface WeeklyArtistChart {
  artist: Artist[];
  '@attr': Attr2;
}

export interface WeeklyAlbumChartResponse {
  weeklyalbumchart: WeeklyAlbumChart;
}

export interface WeeklyAlbumChart {
  album: WeeklyAlbum[];
  '@attr': WeeklyalbumChartAttr;
}

export type WeeklyAlbum = {
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
};

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
  image?: string;
  mbid: string;
  name: string;
  playcount: number;
  streamable: number;
  url: string;
  '#text': string;
};

export interface Attribs {
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

export interface Album {
  mbid: string;
  '#text': string;
}

export interface Attr {
  nowplaying: string;
}

export interface Date {
  uts: string;
  '#text': string;
}

export interface Track {
  artist: Artist;
  streamable: string;
  image: '';
  mbid: string;
  album: Album;
  name: string;
  '@attr': Attr;
  url: string;
  date: Date;
}

export interface Attr2 {
  user: string;
  totalPages: string;
  page: string;
  perPage: string;
  total: string;
}

export interface RecentTracks {
  track: Track[];
  '@attr': Attr2;
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
  '@attr': Attr2;
}

export interface WeeklyArtistChartResponse {
  weeklyartistchart: WeeklyArtistChart;
}

export interface WeeklyArtistChart {
  artist: Artist[];
  '@attr': Attr2;
}

export interface Attr1 {
  rank: string;
}

export interface Attr2 {
  from: string;
  user: string;
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
  '@attr': WeeklyTrackChartAttr2;
}

export interface WeeklyTrackChartTrack {
  artist: WeeklyTrackChartArtist;
  image: Image[];
  mbid: string;
  url: string;
  name: string;
  '@attr': Attr;
  playcount: string;
}

export interface WeeklyTrackChartArtist {
  mbid: string;
  '#text': string;
}

export interface WeeklyTrackChartAttr {
  rank: string;
}

export interface WeeklyTrackChartAttr2 {
  from: string;
  user: string;
  to: string;
}

export enum Errors {
  'InvalidService' = 2,
  'InvalidMethod' = 3,
  'AuthenticationFailed' = 4,
  'Invalid format' = 5,
  'Invalid parameters' = 6,
  'InvalidResourceSpecified' = 7,
  'OperationFailed' = 8,
  'Invalid session key' = 9,
  'InvalidApiKey' = 10,
  'ServiceOffline' = 11,
  'InvalidMethodSignatureSupplied' = 13,
  'TemporaryErrorRequest' = 16,
  'SuspendedApiKey' = 26,
  'RateLimitExceeded' = 29,
}
