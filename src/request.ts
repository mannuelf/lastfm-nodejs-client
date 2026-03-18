import { config } from './config.js';
import { md5 } from './md5.js';

interface RequestOptions {
  method: string;
  user?: string;
  tag?: string;
  period?: string;
  limit?: string;
  page?: string;
  from?: string;
  artist?: string;
  album?: string;
  track?: string;
  country?: string;
  autocorrect?: string;
  mbid?: string;
  lang?: string;
  sk?: string;
  token?: string;
  tags?: string;
  timestamp?: string;
  username?: string;
  password?: string;
}

enum ErrorResponse {
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

const buildUrl = (options: RequestOptions): string => {
  const params = new URLSearchParams();

  params.append('method', options.method);

  if (options.user) params.append('user', options.user);
  if (options.tag) params.append('tag', options.tag);
  if (options.period) params.append('period', options.period);
  if (options.from) params.append('from', options.from);
  if (options.limit) params.append('limit', options.limit);
  if (options.page) params.append('page', options.page);
  if (options.artist) params.append('artist', options.artist);
  if (options.album) params.append('album', options.album);
  if (options.track) params.append('track', options.track);
  if (options.country) params.append('country', options.country);
  if (options.autocorrect) params.append('autocorrect', options.autocorrect);
  if (options.mbid) params.append('mbid', options.mbid);
  if (options.lang) params.append('lang', options.lang);
  if (options.sk) params.append('sk', options.sk);
  if (options.token) params.append('token', options.token);
  if (options.tags) params.append('tags', options.tags);
  if (options.timestamp) params.append('timestamp', options.timestamp);
  if (options.username) params.append('username', options.username);
  if (options.password) params.append('password', options.password);

  params.append('api_key', config.api_key);
  params.append('format', config.format.json);

  return `${config.base_url}?${params.toString()}`;
};

const ErrorMessages: Record<number, string> = {
  [ErrorResponse.InvalidService]: 'Invalid service',
  [ErrorResponse.InvalidMethod]: 'Invalid method',
  [ErrorResponse.AuthenticationFailed]: 'Authentication failed',
  [ErrorResponse.InvalidFormat]: 'Invalid format',
  [ErrorResponse.InvalidParameters]: 'Invalid parameters',
  [ErrorResponse.InvalidResource]: 'Invalid resource',
  [ErrorResponse.OperationFailed]: 'Operation failed',
  [ErrorResponse.InvalidSessionKey]: 'Invalid session key',
  [ErrorResponse.InvalidAPIKey]: 'Invalid API key',
  [ErrorResponse.ServiceOffline]: 'Service offline',
  [ErrorResponse.InvalidMethodSignature]: 'Invalid method signature',
  [ErrorResponse.TemporaryError]: 'Temporary error',
  [ErrorResponse.SuspendedAPIKey]: 'Suspended API key',
  [ErrorResponse.RateLimitExceeded]: 'Rate limit exceeded',
};

const request = async <Response>(options: RequestOptions): Promise<Response> => {
  const url = buildUrl(options);

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const body = await res.json() as { error?: number; message?: string };

  if (body.error) {
    const message = ErrorMessages[body.error] ?? body.message ?? 'Unknown error';
    throw new Error(`LastFM error ${body.error}: ${message}`);
  }

  return body as Response;
};

export const signedRequest = async <Response>(options: RequestOptions, secret: string): Promise<Response> => {
  const params = new URLSearchParams();

  // Collect all params (excluding format/callback)
  const sigParams: Record<string, string> = {};

  sigParams['method'] = options.method;
  sigParams['api_key'] = config.api_key;

  if (options.user) sigParams['user'] = options.user;
  if (options.tag) sigParams['tag'] = options.tag;
  if (options.period) sigParams['period'] = options.period;
  if (options.from) sigParams['from'] = options.from;
  if (options.limit) sigParams['limit'] = options.limit;
  if (options.page) sigParams['page'] = options.page;
  if (options.artist) sigParams['artist'] = options.artist;
  if (options.album) sigParams['album'] = options.album;
  if (options.track) sigParams['track'] = options.track;
  if (options.country) sigParams['country'] = options.country;
  if (options.autocorrect) sigParams['autocorrect'] = options.autocorrect;
  if (options.mbid) sigParams['mbid'] = options.mbid;
  if (options.lang) sigParams['lang'] = options.lang;
  if (options.sk) sigParams['sk'] = options.sk;
  if (options.token) sigParams['token'] = options.token;
  if (options.tags) sigParams['tags'] = options.tags;
  if (options.timestamp) sigParams['timestamp'] = options.timestamp;
  if (options.username) sigParams['username'] = options.username;
  if (options.password) sigParams['password'] = options.password;

  // Generate signature: sort keys alphabetically, concatenate key+value, append secret, MD5
  const sortedKeys = Object.keys(sigParams).sort();
  const sigString = sortedKeys.map(k => `${k}${sigParams[k]}`).join('') + secret;
  const apiSig = md5(sigString);

  // Build POST body
  for (const [k, v] of Object.entries(sigParams)) {
    params.append(k, v);
  }
  params.append('api_sig', apiSig);
  params.append('format', config.format.json);

  const res = await fetch(config.base_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const body = await res.json() as { error?: number; message?: string };

  if (body.error) {
    const message = ErrorMessages[body.error] ?? body.message ?? 'Unknown error';
    throw new Error(`LastFM error ${body.error}: ${message}`);
  }

  return body as Response;
};

export default request;
