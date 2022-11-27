import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

console.log(process.env);

export default {
  api_key: `${process.env.LASTFM_API_KEY}`,
  app_name: `${process.env.LASTFM_APPNAME}`,
  base_url: `${process.env.LASTFM_API_BASE_URL}`,
  format: {
    json: 'json',
    xml: 'xml',
  },
  share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
  username: `${process.env.LASTFM_USER}`,
};
