export interface AuthResponse {
  token: string;
}

export interface UserTopTagsResponse {
  toptags: {
    tag: UserTopTag[];
    '@attr': { user: string };
  };
}

export interface UserTopTag {
  name: string;
  count: string;
  url: string;
}

export interface TagTopTracksResponse {
  tracks: {
    track: TagTrack[];
    '@attr': {
      tag: string;
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface TagTrack {
  name: string;
  duration: string;
  mbid: string;
  url: string;
  streamable: { '#text': string; fulltrack: string };
  artist: { name: string; mbid: string; url: string };
  image: Image[];
  '@attr': { rank: string };
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

export interface ChartTopTagsResponse {
  tags: {
    tag: Tag[];
    '@attr': AttributesPage;
  };
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
  artists: {
    artist: Artist[];
    '@attr': AttributesPage;
  };
}

export interface ChartTopTracksResponse {
  tracks: {
    track: Track[];
    '@attr': AttributesPage;
  };
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

// Album
export interface AlbumInfoResponse {
  album: {
    name: string; artist: string; mbid?: string; url: string;
    image: Image[]; listeners: string; playcount: string;
    tracks?: { track: Track[] };
    tags?: { tag: { name: string; url: string }[] };
    wiki?: { published: string; summary: string; content: string };
  };
}
export interface AlbumTagsResponse {
  tags: { tag: { name: string; url: string }[]; '@attr': { artist: string; album: string } };
}
export interface AlbumTopTagsResponse {
  toptags: { tag: { name: string; count: number; url: string }[]; '@attr': { artist: string; album: string } };
}
export interface AlbumSearchResponse {
  results: {
    albummatches: { album: { name: string; artist: string; mbid?: string; url: string; image: Image[] }[] };
    '@attr': { for: string };
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
  };
}

// Artist
export interface ArtistCorrectionResponse {
  corrections: { correction: { artist: { name: string; mbid: string; url: string }; '@attr': { index: string } } };
}
export interface ArtistInfoResponse {
  artist: {
    name: string; mbid?: string; url: string; image: Image[];
    streamable: string; ontour: string;
    stats: { listeners: string; playcount: string };
    similar: { artist: { name: string; url: string; image: Image[] }[] };
    tags: { tag: { name: string; url: string }[] };
    bio: { links: { link: { text: string; rel: string; href: string } }; published: string; summary: string; content: string };
  };
}
export interface ArtistSimilarResponse {
  similarartists: { artist: { name: string; mbid?: string; match: string; url: string; image: Image[]; streamable: string }[]; '@attr': { artist: string } };
}
export interface ArtistTagsResponse {
  tags: { tag: { name: string; url: string }[]; '@attr': { artist: string } };
}
export interface ArtistTopAlbumsResponse {
  topalbums: { album: { name: string; mbid?: string; url: string; playcount: number; artist: { name: string; mbid: string; url: string }; image: Image[] }[]; '@attr': AttributesPage };
}
export interface ArtistTopTagsResponse {
  toptags: { tag: { name: string; count: number; url: string }[]; '@attr': { artist: string } };
}
export interface ArtistTopTracksResponse {
  toptracks: { track: { name: string; mbid?: string; url: string; playcount: string; listeners: string; artist: { name: string; mbid: string; url: string }; image: Image[] }[]; '@attr': AttributesPage };
}
export interface ArtistSearchResponse {
  results: {
    artistmatches: { artist: { name: string; mbid?: string; url: string; image: Image[]; streamable: string; listeners: string }[] };
    '@attr': { for: string };
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
  };
}

// Auth
export interface AuthSessionResponse {
  session: { name: string; key: string; subscriber: number };
}
export interface AuthMobileSessionResponse {
  session: { name: string; key: string; subscriber: number };
}

// Geo
export interface GeoTopArtistsResponse {
  topartists: { artist: { name: string; mbid?: string; url: string; image: Image[]; streamable: string; listeners: string }[]; '@attr': { country: string; page: string; perPage: string; totalPages: string; total: string } };
}
export interface GeoTopTracksResponse {
  tracks: { track: { name: string; mbid?: string; url: string; listeners: string; image: Image[]; artist: { name: string; mbid: string; url: string } }[]; '@attr': { country: string; page: string; perPage: string; totalPages: string; total: string } };
}

// Library
export interface LibraryArtistsResponse {
  artists: { artist: { name: string; mbid?: string; url: string; image: Image[]; streamable: string; tagcount: string; playcount: string }[]; '@attr': AttributesPage };
}

// Tag
export interface TagInfoResponse {
  tag: { name: string; reach: string; total: string; wiki?: { summary: string; content: string } };
}
export interface TagSimilarResponse {
  similartags: { tag: { name: string; url: string; streamable: string }[]; '@attr': { tag: string } };
}
export interface TagTopAlbumsResponse {
  albums: { album: { name: string; mbid?: string; url: string; artist: { name: string; mbid: string; url: string }; image: Image[] }[]; '@attr': { tag: string; page: string; perPage: string; totalPages: string; total: string } };
}
export interface TagTopArtistsResponse {
  topartists: { artist: { name: string; mbid?: string; url: string; image: Image[]; streamable: string }[]; '@attr': { tag: string; page: string; perPage: string; totalPages: string; total: string } };
}
export interface TagTopTagsResponse {
  toptags: { tag: { name: string; count: number; reach: number }[]; '@attr': { offset: number; num_res: number; total: number } };
}
export interface TagWeeklyChartListResponse {
  weeklychartlist: { chart: { '#text': string; from: string; to: string }[]; '@attr': { tag: string } };
}

// Track
export interface TrackCorrectionResponse {
  corrections: { correction: { track: { name: string; mbid: string; url: string; artist: { name: string; mbid: string; url: string } }; '@attr': { index: string; artistcorrected: string; trackcorrected: string } } };
}
export interface TrackInfoResponse {
  track: {
    name: string; mbid?: string; url: string; duration: string;
    streamable: { '#text': string; fulltrack: string };
    listeners: string; playcount: string;
    artist: { name: string; mbid: string; url: string };
    album?: { artist: string; title: string; mbid?: string; url: string; image: Image[]; '@attr'?: { position: string } };
    toptags: { tag: { name: string; url: string }[] };
    wiki?: { published: string; summary: string; content: string };
  };
}
export interface TrackSimilarResponse {
  similartracks: { track: { name: string; mbid?: string; match: number; url: string; duration: number; streamable: { '#text': string; fulltrack: string }; artist: { name: string; mbid: string; url: string }; image: Image[] }[]; '@attr': { artist: string } };
}
export interface TrackTagsResponse {
  tags: { tag: { name: string; url: string }[]; '@attr': { artist: string; track: string } };
}
export interface TrackTopTagsResponse {
  toptags: { tag: { name: string; count: number; url: string }[]; '@attr': { artist: string; track: string } };
}
export interface TrackSearchResponse {
  results: {
    trackmatches: { track: { name: string; artist: string; mbid?: string; url: string; streamable: string; listeners: string; image: Image[] }[] };
    '@attr': { for: string };
    'opensearch:totalResults': string;
    'opensearch:startIndex': string;
    'opensearch:itemsPerPage': string;
  };
}
export interface ScrobbleResponse {
  scrobbles: { scrobble: { track: { '#text': string; corrected: string }; artist: { '#text': string; corrected: string }; album: { '#text': string; corrected: string }; timestamp: string; ignoredMessage: { code: string; '#text': string } }; '@attr': { accepted: number; ignored: number } };
}

// User
export interface UserPersonalTagsResponse {
  taggings: {
    artists?: { artist: Artist[] };
    albums?: { album: Album[] };
    tracks?: { track: Track[] };
    '@attr': { user: string; tag: string; page: string; perPage: string; totalPages: string; total: string };
  };
}
