import fetch from 'cross-fetch';
import config from './config';

const request = async <Response>(
  method: string,
  user: string,
  period?: string,
  limit?: string,
): Promise<Response> => {
  const url = `
      ${config.base_url}?method=${method}${user ? '&user=' : ''}${user}${
    user ? '&user=' : ''
  }${user}${period ? '&period=' : ''}${period}&${limit ? '&limit=' : ''}${limit}&api_key=${
    config.api_key
  }&format=${config.format.json}`;

  return (await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }
      return res.json();
    })
    .then((json) => json)
    .catch((error) => {
      throw new Error(error);
    })) as Response;
};

export default request;
