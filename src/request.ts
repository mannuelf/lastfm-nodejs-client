import config from './config';

interface Params {
  api_key: string;
  from?: string; // Beginning timestamp of a range - only display scrobbles after this time, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone.
  limit?: string; // The number of results to fetch per page. Defaults to 50. Maximum is 200.
  page?: string; // The page number to fetch. Defaults to first page.
  recenttracks?: string;
  to?: string;
  user: string; // The last.fm username to fetch the recent tracks of
  tag?: string;
  taggingtype: string;
  extended: string;
  period?: string; // overall | 7day | 1month | 3month | 6month | 12month
}

const request = async <Parameters, Response>(
  method: string,
  user: string,
  period?: string,
  limit?: number,
): Promise<Response> => {
  const url = `
      ${config.base_url}?method=${method}${user ? '&user=' : ''}${user}${
    user ? '&user=' : ''
  }${user}${period ? '&period=' : ''}${period}&${limit ? '&limit=' : ''}${limit}&api_key=${
    config.api_key
  }&format=${config.format.json}`;

  return (await fetch(config.base_url, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error))) as Response;
};

export default request;
