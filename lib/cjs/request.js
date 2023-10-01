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
const config_1 = require("./config");
var ErrorResponse;
(function (ErrorResponse) {
    ErrorResponse[ErrorResponse["InvalidService"] = 2] = "InvalidService";
    ErrorResponse[ErrorResponse["InvalidMethod"] = 3] = "InvalidMethod";
    ErrorResponse[ErrorResponse["AuthenticationFailed"] = 4] = "AuthenticationFailed";
    ErrorResponse[ErrorResponse["InvalidFormat"] = 5] = "InvalidFormat";
    ErrorResponse[ErrorResponse["InvalidParameters"] = 6] = "InvalidParameters";
    ErrorResponse[ErrorResponse["InvalidResource"] = 7] = "InvalidResource";
    ErrorResponse[ErrorResponse["OperationFailed"] = 8] = "OperationFailed";
    ErrorResponse[ErrorResponse["InvalidSessionKey"] = 9] = "InvalidSessionKey";
    ErrorResponse[ErrorResponse["InvalidAPIKey"] = 10] = "InvalidAPIKey";
    ErrorResponse[ErrorResponse["ServiceOffline"] = 11] = "ServiceOffline";
    ErrorResponse[ErrorResponse["InvalidMethodSignature"] = 13] = "InvalidMethodSignature";
    ErrorResponse[ErrorResponse["TemporaryError"] = 16] = "TemporaryError";
    ErrorResponse[ErrorResponse["SuspendedAPIKey"] = 26] = "SuspendedAPIKey";
    ErrorResponse[ErrorResponse["RateLimitExceeded"] = 29] = "RateLimitExceeded";
})(ErrorResponse || (ErrorResponse = {}));
const buildUrl = (options) => {
    const params = new URLSearchParams();
    params.append('method', options.method);
    if (options.user)
        params.append('user', options.user);
    if (options.period)
        params.append('period', options.period);
    if (options.limit)
        params.append('limit', options.limit);
    params.append('api_key', config_1.config.api_key);
    params.append('format', config_1.config.format.json);
    return `${config_1.config.base_url}?${params.toString()}`;
};
const request = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const url = buildUrl(options);
    return (yield (0, cross_fetch_1.default)(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!res.ok) {
            throw new Error(res.statusText);
        }
        switch (res.status) {
            case 200: {
                return yield res.json();
            }
            case 400: {
                throw new Error('Bad request');
            }
            case 401: {
                throw new Error('Unauthorized');
            }
            case 403: {
                throw new Error('Forbidden');
            }
            case 404: {
                throw new Error('Not found');
            }
            case 500: {
                throw new Error('Internal server error');
            }
            case 503: {
                throw new Error('Service unavailable');
            }
            case ErrorResponse.InvalidAPIKey: {
                throw new Error('Invalid API key');
            }
            case ErrorResponse.InvalidMethod: {
                throw new Error('Invalid method');
            }
            case ErrorResponse.InvalidParameters: {
                throw new Error('Invalid parameters');
            }
            case ErrorResponse.InvalidResource: {
                throw new Error('Invalid resource');
            }
            case ErrorResponse.InvalidSessionKey: {
                throw new Error('Invalid session key');
            }
            case ErrorResponse.InvalidService: {
                throw new Error('Invalid service');
            }
            case ErrorResponse.OperationFailed: {
                throw new Error('Operation failed');
            }
            case ErrorResponse.RateLimitExceeded: {
                throw new Error('Rate limit exceeded');
            }
            case ErrorResponse.ServiceOffline: {
                throw new Error('Service offline');
            }
            case ErrorResponse.SuspendedAPIKey: {
                throw new Error('Suspended API key');
            }
            case ErrorResponse.TemporaryError: {
                throw new Error('Temporary error');
            }
            case ErrorResponse.AuthenticationFailed: {
                throw new Error('Authentication failed');
            }
            case ErrorResponse.InvalidFormat: {
                throw new Error('Invalid format');
            }
            case ErrorResponse.InvalidMethodSignature: {
                throw new Error('Invalid method signature');
            }
            default: {
                throw new Error('Unknown error');
            }
        }
    }))
        .then((json) => json)
        .catch((error) => {
        console.log('🚨 error:', error);
    }));
});
exports.default = request;
