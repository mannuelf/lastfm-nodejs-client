"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOptions = void 0;
function createOptions(method, user, period, limit, page) {
    return {
        method,
        page,
        user,
        period,
        limit,
    };
}
exports.createOptions = createOptions;
