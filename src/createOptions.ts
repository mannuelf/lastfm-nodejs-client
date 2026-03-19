/**
 * Builds a request options object for use with `request` or `signedRequest`.
 *
 * @param method - The Last.fm API method string (e.g. `'user.getInfo'`)
 * @param user - Last.fm username
 * @param period - Time period (`overall`, `7day`, `1month`, `3month`, `6month`, `12month`)
 * @param limit - Number of results to return per page
 * @param page - Page number for paginated results (1-indexed)
 * @param from - Unix timestamp; only return scrobbles after this time
 * @param tag - Tag name
 * @param artist - Artist name
 * @param album - Album title
 * @param track - Track title
 * @param country - Country name as defined by the ISO 3166-1 standard
 * @param autocorrect - Set to `'1'` to auto-correct misspelled artist/track names
 * @param mbid - MusicBrainz ID for the resource
 * @param lang - ISO 639 alpha-2 language code for localised text (default `'en'`)
 * @param sk - Session key obtained via the auth flow
 * @param token - Authentication token from `auth.getToken`
 * @param tags - Comma-separated list of user-supplied tags (max 10)
 * @param timestamp - Unix timestamp of the scrobble
 * @returns A request options object ready to pass to `request` or `signedRequest`
 */
export function createOptions(
  method: string,
  user: string,
  period?: string,
  limit?: string,
  page?: string,
  from?: string,
  tag?: string,
  artist?: string,
  album?: string,
  track?: string,
  country?: string,
  autocorrect?: string,
  mbid?: string,
  lang?: string,
  sk?: string,
  token?: string,
  tags?: string,
  timestamp?: string,
) {
  return {
    method,
    page,
    user,
    tag,
    period,
    limit,
    from,
    artist,
    album,
    track,
    country,
    autocorrect,
    mbid,
    lang,
    sk,
    token,
    tags,
    timestamp,
  };
}
