"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopArtists = void 0;
const createOptions_1 = require("./createOptions");
const request_1 = __importDefault(require("./request"));
/**
 * GET: Top Artist - LastFM
 *
 * https://www.last.fm/api/show/user.getTopArtists
 * @returns Top Artists
 */
function getTopArtists(method, user, period, limit) {
    const options = (0, createOptions_1.createOptions)(method, user, period, limit);
    return (0, request_1.default)(options);
}
exports.getTopArtists = getTopArtists;
