import fetch from 'cross-fetch';
import { config } from './config';

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

const request = async <Response>(options: RequestOptions): Promise<Response> => {
  const url = buildUrl(options);

  return (await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      switch (res.status) {
        case 200: {
          if (res.headers.get('content-type').includes('json')) {
            const body = await res.json();
            return body;
          }
          break;
        }
        case 400: {
          throw new Error('Bad request');
        }
        case 401: {
          throw new Error('Unauthorized');
        }
        case 403: {
          throw new Error('Forbidden');
        }
        case 404: {
          throw new Error('Not found');
        }
        case 500: {
          throw new Error('Internal server error');
        }
        case 503: {
          throw new Error('Service unavailable');
        }
        case ErrorResponse.InvalidAPIKey: {
          throw new Error('Invalid API key');
        }
        case ErrorResponse.InvalidMethod: {
          throw new Error('Invalid method');
        }
        case ErrorResponse.InvalidParameters: {
          throw new Error('Invalid parameters');
        }
        case ErrorResponse.InvalidResource: {
          throw new Error('Invalid resource');
        }
        case ErrorResponse.InvalidSessionKey: {
          throw new Error('Invalid session key');
        }
        case ErrorResponse.InvalidService: {
          throw new Error('Invalid service');
        }
        case ErrorResponse.OperationFailed: {
          throw new Error('Operation failed');
        }
        case ErrorResponse.RateLimitExceeded: {
          throw new Error('Rate limit exceeded');
        }
        case ErrorResponse.ServiceOffline: {
          throw new Error('Service offline');
        }
        case ErrorResponse.SuspendedAPIKey: {
          throw new Error('Suspended API key');
        }
        case ErrorResponse.TemporaryError: {
          throw new Error('Temporary error');
        }
        case ErrorResponse.AuthenticationFailed: {
          throw new Error('Authentication failed');
        }
        case ErrorResponse.InvalidFormat: {
          throw new Error('Invalid format');
        }
        case ErrorResponse.InvalidMethodSignature: {
          throw new Error('Invalid method signature');
        }

        default: {
          throw new Error('Unknown error');
        }
      }
    })
    .then((json) => json)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('🚨 error:', error);
    })) as Response;
};

export default request;
