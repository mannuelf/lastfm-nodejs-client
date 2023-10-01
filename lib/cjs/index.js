"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastFmApi = void 0;
const auth_1 = require("./auth");
const config_1 = require("./config");
const getInfo_1 = require("./getInfo");
const getLovedTracks_1 = require("./getLovedTracks");
const getRecentTracks_1 = require("./getRecentTracks");
const getTopAlbums_1 = require("./getTopAlbums");
const getTopArtists_1 = require("./getTopArtists");
const getTopTracks_1 = require("./getTopTracks");
const getWeeklyAlbumChart_1 = require("./getWeeklyAlbumChart");
const getWeeklyArtistChart_1 = require("./getWeeklyArtistChart");
const getWeeklyChartList_1 = require("./getWeeklyChartList");
const getWeeklyTrackChart_1 = require("./getWeeklyTrackChart");
const method_1 = require("./method");
const topTags_1 = require("./chart/topTags");
const topTracks_1 = require("./chart/topTracks");
const topArtists_1 = require("./chart/topArtists");
const LastFmApi = () => ({
    auth: auth_1.auth,
    chart: {
        chartTopArtists: topArtists_1.chartTopArtists,
        chartTopTracks: topTracks_1.chartTopTracks,
        chartTopTags: topTags_1.chartTopTags,
    },
    config: config_1.config,
    getInfo: getInfo_1.getInfo,
    getLovedTracks: getLovedTracks_1.getLovedTracks,
    getRecentTracks: getRecentTracks_1.getRecentTracks,
    getTopAlbums: getTopAlbums_1.getTopAlbums,
    getTopArtists: getTopArtists_1.getTopArtists,
    getTopTracks: getTopTracks_1.getTopTracks,
    getWeeklyAlbumChart: getWeeklyAlbumChart_1.getWeeklyAlbumChart,
    getWeeklyArtistChart: getWeeklyArtistChart_1.getWeeklyArtistChart,
    getWeeklyChartList: getWeeklyChartList_1.getWeeklyChartList,
    getWeeklyTrackChart: getWeeklyTrackChart_1.getWeeklyTrackChart,
    method: method_1.method,
});
exports.LastFmApi = LastFmApi;
