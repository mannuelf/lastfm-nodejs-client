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
exports.getWeeklyAlbumChart = void 0;
const createOptions_1 = require("./createOptions");
const request_1 = __importDefault(require("./request"));
/**
 * GET: Weekly album chart - LastFM
 *
 * https://www.last.fm/api/show/user.getWeeklyAlbumChart
 * @returns Weekly album chart
 */
function getWeeklyAlbumChart(method, user, period, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = (0, createOptions_1.createOptions)(method, user, period, limit);
        return yield (0, request_1.default)(options);
    });
}
exports.getWeeklyAlbumChart = getWeeklyAlbumChart;
