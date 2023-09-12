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
} satisfies Config;
