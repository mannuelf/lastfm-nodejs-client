import * as dotenv from 'dotenv';
dotenv.config();

interface Config {  
  api_key: string; 
  app_name: string;
  base_url: string;
  format: {
    json: string;
    xml: string;
  };
  share_secret: string;
  username: string;
};
/**
 * @description Stores the Last.fm API key, app name, base url, format, shared secret, and username.
 * Simply add a .env file to the root of the project and add the following:
 * LASTFM_API_KEY=your_api_key
 * LASTFM_APPNAME=your_app_name
 * LASTFM_API_BASE_URL=your_base_url
 * LASTFM_SHARED_SECRET=your_shared_secret
 * LASTFM_USER=your_username
 */
export const config = {
  api_key: `${process.env.LASTFM_API_KEY}`,
  app_name: `${process.env.LASTFM_APPNAME}`,
  base_url: `${process.env.LASTFM_API_BASE_URL}`,
  format: {
    json: 'json',
    xml: 'xml',
  },
  share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
  username: `${process.env.LASTFM_USER}`,
} satisfies Config;
