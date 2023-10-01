/**
 * @description Stores the Last.fm API key, app name, base url, format, shared secret, and username.
 * Simply add a .env file to the root of the project and add the following:
 * LASTFM_API_KEY=your_api_key
 * LASTFM_APPNAME=your_app_name
 * LASTFM_API_BASE_URL=your_base_url
 * LASTFM_SHARED_SECRET=your_shared_secret
 * LASTFM_USER=your_username
 */
export declare const config: {
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
//# sourceMappingURL=config.d.ts.map