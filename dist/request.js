"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
/**
 *
 * @param api_key {string}
 * @param extended {string}
 * @param method {string}
 * @param user {string} - (Required) : The last.fm username to fetch the friends of.
 * @param from {string} - (Optional) : Beginning timestamp of a range - only display scrobbles after this time, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone.
 * @param limit {string} - The number of results to fetch per page. Defaults to 50.
 * @param page {string} - The page number to fetch. Defaults to first page.
 * @param period {string} - (Optional) : overall | 7day | 1month | 3month | 6month | 12month - The time period over which to retrieve top artists for.
 * @param recenttracks {string} - Whether or not to include information about friends' recent listening in the response.
 * @param tag {string}
 * @param taggingtype {string}
 * @param to {string} - (Optional) : Beginning timestamp of a range - only display scrobbles after this time, in UNIX timestamp format (integer number of seconds since 00:00:00, January 1st 1970 UTC). This must be in the UTC time zone.
 * @returns json data
 */
const request = (api_key, extended, method, user, from, limit, page, period, recenttracks, tag, taggingtype, to) => __awaiter(void 0, void 0, void 0, function* () {
    return yield fetch(`${config_1.default.base_url}?method=${method}${user ? '&user=' : ''}${user}${user ? '&user=' : ''}${user}${period ? '&period=' : ''}${period}&${limit ? '&limit=' : ''}${limit}&api_key=${config_1.default.api_key}&format=${config_1.default.format.json}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => res.json())
        .then((json) => json)
        .catch((error) => console.log('🔥 Uh oh...', error));
});
exports.default = request;
