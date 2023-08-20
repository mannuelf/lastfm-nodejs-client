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
const buildUrl = (options) => {
    const params = new URLSearchParams();
    params.append('method', options.method);
    if (options.user)
        params.append('user', options.user);
    if (options.period)
        params.append('period', options.period);
    if (options.limit)
        params.append('limit', options.limit);
    params.append('api_key', config_1.default.api_key);
    params.append('format', config_1.default.format.json);
    return `${config_1.default.base_url}?${params.toString()}`;
};
const request = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const url = buildUrl(options);
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
        console.log(error);
    }));
});
exports.default = request;
