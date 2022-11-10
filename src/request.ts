import config from './config';

/**
 *
 * @param api_key {string}
 * @param extended {string}
 * @param method {string}
 * @param user {string} - (Required) : The last.fm username to fetch the friends of.
 * @param from {string} - (Optional) : Beginning timestamp of a range - only display scrobbles after this time, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone.
 * @param limit {string} - The number of results to fetch per page. Defaults to 50.
 * @param page {string} - The page number to fetch. Defaults to first page.
 * @param period {string} - (Optional) : overall | 7day | 1month | 3month | 6month | 12month - The time period over which to retrieve top artists for.
 * @param recenttracks {string} - Whether or not to include information about friends' recent listening in the response.
 * @param tag {string}
 * @param taggingtype {string}
 * @param to {string} - (Optional) : Beginning timestamp of a range - only display scrobbles after this time, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone.
 * @returns json data
 */
const request = async <Response>(
  api_key: string,
  extended: string,
  method: string,
  user: string,
  from?: string,
  limit?: string,
  page?: string,
  period?: string,
  recenttracks?: string,
  tag?: string,
  taggingtype?: string,
  to?: string,
): Promise<Response> => {
  return await fetch(
    `${config.base_url}?method=${method}${user ? '&user=' : ''}${user}${
      user ? '&user=' : ''
    }${user}${period ? '&period=' : ''}${period}&${limit ? '&limit=' : ''}${limit}&api_key=${
      config.api_key
    }&format=${config.format.json}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((json) => json)
    .catch((error) => console.log('🔥 Uh oh...', error));
};

export default request;
