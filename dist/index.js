"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const method_1 = __importDefault(require("./method"));
const request_1 = __importDefault(require("./request"));
function LastFmApi() {
    /**
     * POST: Auth - LastFM
     *
     * https://www.last.fm/api/show/auth.getToken
     *
     * Authentication tokens are API account specific.
     * They are valid for 60 minutes from the moment they are granted.
     * Can only used once (they are consumed when a session is created).
     * @returns Auth token
     */
    function auth(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: User profile information - LastFM
     *
     * https://www.last.fm/api/show/user.getInfo
     * @returns User profile data
     */
    function getInfo(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Love Tracks - LastFM
     *
     * https://www.last.fm/api/show/user.getLovedTracks
     * @returns Loved Tracks;
     */
    function getLovedTracks(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Recent Tracks - LastFM
     *
     * https://www.last.fm/api/show/user.getRecentTracks
     * @returns Recent Tracks
     */
    function getRecentTracks(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Top Albums - LastFM
     *
     * https://www.last.fm/api/show/user.getTopAlbums
     * @returns Top Albums
     */
    function getTopAlbums(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Top Artist - LastFM
     *
     * https://www.last.fm/api/show/user.getTopArtists
     * @returns Top Artists
     */
    function getTopArtists(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Top Tracks - LastFM
     *
     * https://www.last.fm/api/show/user.getTopTracks
     * @returns Top Tracks
     */
    function getTopTracks(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Weekly album chart - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyAlbumChart
     * @returns Weekly album chart
     */
    function getWeeklyAlbumChart(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Weekly artist chart - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyArtistChart
     * @returns Weekly artist chart
     */
    function getWeeklyArtistChart(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Weekly chart list - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyChartList
     * @returns Weekly chart list
     */
    function getWeeklyChartList(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    /**
     * GET: Weekly track chart - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyTrackChart
     * @returns Weekly track chart
     */
    function getWeeklyTrackChart(method, user, period, limit) {
        return (0, request_1.default)(method, user, period, limit);
    }
    return {
        auth,
        config: config_1.default,
        getInfo,
        getLovedTracks,
        getRecentTracks,
        getTopAlbums,
        getTopArtists,
        getTopTracks,
        getWeeklyAlbumChart,
        getWeeklyArtistChart,
        getWeeklyChartList,
        getWeeklyTrackChart,
        method: method_1.default,
    };
}
exports.default = LastFmApi;
