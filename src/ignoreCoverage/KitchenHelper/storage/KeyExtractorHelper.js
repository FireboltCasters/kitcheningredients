"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyExtractorHelper = void 0;
class KeyExtractorHelper {
    static getListOfStaticKeyValues(Class) {
        let classKeys = Object.keys(Class);
        let synchedKeys = [];
        for (let classKey of classKeys) {
            let synchedKey = Class[classKey];
            synchedKeys.push(synchedKey);
        }
        return synchedKeys;
    }
}
exports.KeyExtractorHelper = KeyExtractorHelper;
