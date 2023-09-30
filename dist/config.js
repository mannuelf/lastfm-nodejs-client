"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
/**
 * @description Stores the Last.fm API key, app name, base url, format, shared secret, and username.
 * Simply add a .env file to the root of the project and add the following:
 * LASTFM_API_KEY=your_api_key
 * LASTFM_APPNAME=your_app_name
 * LASTFM_API_BASE_URL=your_base_url
 * LASTFM_SHARED_SECRET=your_shared_secret
 * LASTFM_USER=your_username
 */
exports.config = {
    api_key: `${process.env.LASTFM_API_KEY}`,
    app_name: `${process.env.LASTFM_APPNAME}`,
    base_url: `${process.env.LASTFM_API_BASE_URL}`,
    format: {
        json: 'json',
        xml: 'xml',
    },
    share_secret: `${process.env.LASTFM_SHARED_SECRET}`,
    username: `${process.env.LASTFM_USER}`,
};
