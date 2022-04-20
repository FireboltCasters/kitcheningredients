"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyDirectusStorage = void 0;
// @ts-nocheck
const sync_storage_1 = __importDefault(require("sync-storage"));
const RequiredStorageKeys_1 = require("./RequiredStorageKeys");
const DefaultStorage_1 = require("./DefaultStorage");
class MyDirectusStorage extends DefaultStorage_1.DefaultStorage /** extends Storage */ {
    constructor() {
        super();
    }
    static async init() {
        const data = await sync_storage_1.default.init();
    }
    getStorageImplementation() {
        return sync_storage_1.default;
    }
    get_cookie_config() {
        let sessionStorageConfig = null;
        let localStorageConfig = sync_storage_1.default.get(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_CONFIG);
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
    getAllKeys() {
        return sync_storage_1.default.getAllKeys();
    }
    has_cookie_config() {
        return !!this.get_cookie_config();
    }
    set_cookie_config(config) {
        sync_storage_1.default.set(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_CONFIG, JSON.stringify(config));
    }
}
exports.MyDirectusStorage = MyDirectusStorage;
