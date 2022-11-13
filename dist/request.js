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
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const config_1 = __importDefault(require("./config"));
const request = (method, user, period, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `
      ${config_1.default.base_url}?method=${method}${user ? '&user=' : ''}${user}${user ? '&user=' : ''}${user}${period ? '&period=' : ''}${period}&${limit ? '&limit=' : ''}${limit}&api_key=${config_1.default.api_key}&format=${config_1.default.format.json}`;
    return (yield (0, cross_fetch_1.default)(url, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((res) => {
        if (res.status >= 400) {
            throw new Error('Bad response from server');
        }
        return res.json();
    })
        .then((json) => json)
        .catch((error) => {
        throw new Error(error);
    }));
});
exports.default = request;
