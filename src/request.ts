import { config } from './config.js';

interface RequestOptions {
  method: string;
  user?: string;
  period?: string;
  limit?: string;
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
  if (options.period) params.append('period', options.period);
  if (options.limit) params.append('limit', options.limit);

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

export default request;
