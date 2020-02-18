'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../lib/utils");
/**
 *
 * Base storage engine
 *
 */
function storageEngine(db) {
    if (db === void 0) { db = utils_1.required("db"); }
    return {
        insert: function (_a) {
            var _b = _a.data, data = _b === void 0 ? utils_1.required("data") : _b, _c = _a.model, model = _c === void 0 ? utils_1.required("model") : _c;
            return db.create(model, data);
        },
        find: function (_a) {
            var _b = _a.model, model = _b === void 0 ? utils_1.required("model") : _b, _c = _a.query, query = _c === void 0 ? utils_1.required("query") : _c, _d = _a.sort, sort = _d === void 0 ? {} : _d;
            return db.find(model, query, sort);
        },
        findOne: function (query) {
            if (query === void 0) { query = utils_1.required("query"); }
            return db.findOne(query);
        },
        update: function (_a) {
            var _b = _a.query, query = _b === void 0 ? utils_1.required("query") : _b, _c = _a.model, model = _c === void 0 ? utils_1.required("model") : _c, _d = _a.updateObj, updateObj = _d === void 0 ? utils_1.required("updateObj") : _d;
            return db.update(model, query, updateObj);
        },
        removeOne: function (_a) {
            var _b = _a.query, query = _b === void 0 ? utils_1.required("query") : _b, _c = _a.model, model = _c === void 0 ? utils_1.required("model") : _c;
            return db.removeOne(model, query);
        },
        clear: function (_a) {
            var _b = _a.model, model = _b === void 0 ? utils_1.required("model") : _b, _c = _a.query, query = _c === void 0 ? utils_1.required("query") : _c;
            return db.removeMany(model, query);
        }
    };
}
exports.default = storageEngine;
