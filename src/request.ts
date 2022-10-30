import fetch, { RequestInit } from 'node-fetch';
import config from './config';

const request = async <Parameters, Response>(
  method: string,
  user: string = '',
  period: string = '',
  limit?: number
): Promise<Response> => {
  const url = `
      ${config.base_url}?method=${method}${user ? '&user=' : ''}${user}${
    user ? '&user=' : ''
  }${user}${period ? '&period=' : ''}${period}&${
    limit ? '&limit=' : ''
  }${limit}&api_key=${config.api_key}&format=${config.format.json}`;

  return (await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error))) as Response;
};

export default request;
