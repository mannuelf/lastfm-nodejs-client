"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const createOptions_1 = require("./createOptions");
const request_1 = __importDefault(require("./request"));
/**
 * GET: User profile information - LastFM
 *
 * https://www.last.fm/api/show/user.getInfo
 * @returns User profile information
 */
async function getInfo(method, user) {
    const options = (0, createOptions_1.createOptions)(method, user);
    return await (0, request_1.default)(options);
}
exports.getInfo = getInfo;
