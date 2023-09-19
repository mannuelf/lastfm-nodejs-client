"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTopAlbums = void 0;
const createOptions_1 = require("./createOptions");
const request_1 = __importDefault(require("./request"));
/**
 * GET: Top Albums - LastFM
 *
 * https://www.last.fm/api/show/user.getTopAlbums
 * @returns Top Albums
 */
function getTopAlbums(method, user, period, limit) {
    const options = (0, createOptions_1.createOptions)(method, user, period, limit);
    return (0, request_1.default)(options);
}
exports.getTopAlbums = getTopAlbums;
