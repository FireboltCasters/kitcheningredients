"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDirectusStorage = void 0;
// @ts-nocheck
const RequiredStorageKeys_1 = require("./RequiredStorageKeys");
const DefaultStorage_1 = require("./DefaultStorage");
const WebStorageWrapper_1 = require("./WebStorageWrapper");
class MyDirectusStorage extends DefaultStorage_1.DefaultStorage /** extends Storage */ {
    static async init() {
    }
    constructor() {
        super();
    }
    getStorageImplementation() {
        let cookie_config = this.get_cookie_config();
        let necessaryAccepted = cookie_config?.necessary;
        let selectedWebstorage = !!necessaryAccepted ? localStorage : sessionStorage;
        return new WebStorageWrapper_1.WebStorageWrapper(selectedWebstorage);
    }
    get_cookie_config() {
        let sessionStorageConfig = sessionStorage.getItem(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_CONFIG);
        let localStorageConfig = localStorage.getItem(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_CONFIG);
        let usedCookieConfig = !!localStorageConfig ? localStorageConfig : sessionStorageConfig;
        if (!!usedCookieConfig) {
            try {
                return JSON.parse(usedCookieConfig);
            }
            catch (err) {
                console.log(err);
            }
        }
        return null;
    }
    has_cookie_config() {
        return !!this.get_cookie_config();
    }
    getAllKeys() {
        let storage = this.getStorageImplementation();
        return Object.keys(storage.webstorage);
    }
    set_cookie_config(config) {
        if (config.necessary) {
            localStorage.setItem(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config));
        }
        else {
            sessionStorage.setItem(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config));
        }
    }
}
exports.MyDirectusStorage = MyDirectusStorage;
