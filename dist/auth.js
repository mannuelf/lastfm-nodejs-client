"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const createOptions_1 = require("./createOptions");
const request_1 = __importDefault(require("./request"));
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
    const options = (0, createOptions_1.createOptions)(method, user, period, limit);
    return (0, request_1.default)(options);
}
exports.auth = auth;
