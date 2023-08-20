import fetch from 'cross-fetch';
import config from './config';

interface RequestOptions {
  method: string;
  user?: string;
  period?: string;
  limit?: string;
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
}

const request = async <Response>(options: RequestOptions): Promise<Response> => {
  const url = buildUrl(options);
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Bad response from server');
  }

  const json = await response.json();
  return json as Response;
};

export default request;
