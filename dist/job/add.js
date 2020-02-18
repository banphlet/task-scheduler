'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
var TOTAL_DEFAULT_CONCURRENCY = 20;
var parameters = {};
function add(name, handler, options) {
    if (name === void 0) { name = utils_1.required("name"); }
    if (handler === void 0) { handler = utils_1.required("handler"); }
    if (options === void 0) { options = utils_1.required("options"); }
    parameters[name] = {
        handler: handler,
        totalConcurrency: options.totalConcurrency || TOTAL_DEFAULT_CONCURRENCY,
        duration: options.duration
    };
    return parameters;
}
exports.default = add;
