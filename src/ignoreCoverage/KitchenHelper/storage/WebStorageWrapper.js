"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebStorageWrapper = void 0;
class WebStorageWrapper {
    webstorage;
    constructor(webstorage) {
        this.webstorage = webstorage;
    }
    get(key) {
        return this.webstorage.getItem(key);
    }
    remove(key) {
        return this.webstorage.removeItem(key);
    }
    set(key, value) {
        return this.webstorage.setItem(key, value);
    }
}
exports.WebStorageWrapper = WebStorageWrapper;
