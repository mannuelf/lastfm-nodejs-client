"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("./request"));
const LastFmApi = function LastFmApi() {
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
    const auth = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: User profile information - LastFM
     *
     * https://www.last.fm/api/show/user.getInfo
     * @returns User profile data
     */
    const getInfo = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Love Tracks - LastFM
     *
     * https://www.last.fm/api/show/user.getLovedTracks
     * @returns Loved Tracks;
     */
    const getLovedTracks = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Recent Tracks - LastFM
     *
     * https://www.last.fm/api/show/user.getRecentTracks
     * @returns Recent Tracks
     */
    const getRecentTracks = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Top Albums - LastFM
     *
     * https://www.last.fm/api/show/user.getTopAlbums
     * @returns Top Albums
     */
    const getTopAlbums = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Top Artist - LastFM
     *
     * https://www.last.fm/api/show/user.getTopArtists
     * @returns Top Artists
     */
    const getTopArtists = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Top Tracks - LastFM
     *
     * https://www.last.fm/api/show/user.getTopTracks
     * @returns Top Tracks
     */
    const getTopTracks = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Weekly album chart - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyAlbumChart
     * @returns Weekly album chart
     */
    const getWeeklyAlbumChart = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Weekly artist chart - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyArtistChart
     * @returns Weekly artist chart
     */
    const getWeeklyArtistChart = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Weekly chart list - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyChartList
     * @returns Weekly chart list
     */
    const getWeeklyChartList = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    /**
     * GET: Weekly track chart - LastFM
     *
     * https://www.last.fm/api/show/user.getWeeklyTrackChart
     * @returns Weekly track chart
     */
    const getWeeklyTrackChart = (method, user, period, limit) => {
        return (0, request_1.default)(method, user, period, limit);
    };
    return {
        auth,
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
    };
};
exports.default = LastFmApi;
