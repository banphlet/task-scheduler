'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function required(str) {
    throw new Error("missing parameter " + str);
}
exports.required = required;
