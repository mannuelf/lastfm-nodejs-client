"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartTopArtists = void 0;
const createOptions_1 = require("../createOptions");
const request_1 = __importDefault(require("../request"));
async function chartTopArtists(method, user, period, page, limit) {
    const options = (0, createOptions_1.createOptions)(method, user, period, page, limit);
    return await (0, request_1.default)(options);
}
exports.chartTopArtists = chartTopArtists;
