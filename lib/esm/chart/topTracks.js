"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartTopTracks = void 0;
const createOptions_1 = require("../createOptions");
const request_1 = __importDefault(require("../request"));
async function chartTopTracks(method, page) {
    const options = (0, createOptions_1.createOptions)(method, page);
    return await (0, request_1.default)(options);
}
exports.chartTopTracks = chartTopTracks;
