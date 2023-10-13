import { type UserResponse } from "./lastfm.types";
import { createOptions } from "./createOptions";
import request from "./request";

/**
 * GET: User profile information - LastFM
 *
 * https://www.last.fm/api/show/user.getInfo
 * @returns User profile information
 */
export async function getInfo (
  method: string,
  user: string
): Promise<UserResponse> {
  const options = createOptions(method, user);
  return await request<UserResponse>(options);
}
