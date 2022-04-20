"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStorage = void 0;
const RequiredStorageKeys_1 = require("./RequiredStorageKeys");
const SynchedState_1 = __importDefault(require("../synchedstate/SynchedState"));
const ColorCodeHelper_1 = __importDefault(require("../theme/ColorCodeHelper"));
SynchedState_1.default.registerSynchedStates(RequiredStorageKeys_1.RequiredStorageKeys.THEME, ColorCodeHelper_1.default.VALUE_THEME_DEFAULT, null, null, false);
class DefaultStorage {
    static async init() {
    }
    constructor() {
    }
    defaultSaveStorageContext(storageKey, state, payload) {
        try {
            this.set(storageKey, payload);
        }
        catch (err) {
            console.log(err);
            return false;
        }
        return true;
    }
    initContextStores() {
        let keys = this.getAllKeys();
        keys = SynchedState_1.default.getRequiredStorageKeys();
        this.initSynchedKeys(keys, true);
        let pluginStorageKeys = SynchedState_1.default.getPluginStorageKeys();
        this.initSynchedKeys(pluginStorageKeys, false);
    }
    initSynchedKeys(keys, override) {
        for (let i = 0; i < keys.length; i++) {
            let storageKey = keys[i];
            let value = this.get(storageKey);
            SynchedState_1.default.registerSynchedStates(storageKey, value, this.defaultSaveStorageContext.bind(this), null, override);
        }
    }
    getAllKeys() {
        throw new Error("Method not implemented.");
    }
    getStorageImplementation() {
        return null;
    }
    get_cookie_config() {
        return null;
    }
    has_cookie_config() {
        return !!this.get_cookie_config();
    }
    set_cookie_config(config) {
    }
    is_guest() {
        return !!this.get(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_IS_GUEST);
    }
    set_is_guest(isGuest) {
        this.setValueOrDeleteIfNull(RequiredStorageKeys_1.RequiredStorageKeys.KEY_COOKIE_IS_GUEST, isGuest);
    }
    setValueOrDeleteIfNull(key, value) {
        if (!value) {
            this.delete(key);
        }
        else {
            this.set(key, value);
        }
    }
    clear_credentials() {
        this.set_refresh_token(null);
        this.set_access_token(null);
        this.set_is_guest(false);
    }
    has_credentials_saved() {
        if (!!this.get_auth_refresh_token()) {
            return true;
        }
        return !!this.get_auth_access_token();
    }
    /**
     * Refresh Token
     */
    set_refresh_token(token) {
        this.setValueOrDeleteIfNull(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN, token);
    }
    set auth_refresh_token(token) {
        this.set_refresh_token(token);
    }
    get_auth_refresh_token() {
        return this.getStorageImplementation().get(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN);
    }
    get auth_refresh_token() {
        return this.get_auth_refresh_token();
    }
    /**
     * Auth Token
     */
    set_access_token(token) {
        this.setValueOrDeleteIfNull(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN, token);
    }
    set auth_token(token) {
        this.set_access_token(token);
    }
    get_auth_access_token() {
        return this.getStorageImplementation().get(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN);
    }
    get auth_token() {
        return this.get_auth_access_token();
    }
    /**
     * Expires
     */
    set_auth_expires(time) {
        console.log("set_auth_expires");
        console.log("time: ", time);
        let expiresIn = null;
        if (!!time) {
            let timeNumber = parseInt("" + time);
            expiresIn = new Date(Date.now() + timeNumber);
            expiresIn = expiresIn.toISOString();
            console.log("expiresIn");
            console.log(expiresIn);
        }
        this.setValueOrDeleteIfNull(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_EXPIRES_DATE, expiresIn + "");
        this.setValueOrDeleteIfNull(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_EXPIRES, time + "");
    }
    set auth_expires(time) {
        this.set_auth_expires(time);
    }
    get_auth_expires() {
        return Number(this.getStorageImplementation().get(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_EXPIRES));
    }
    get auth_expires() {
        return this.get_auth_expires();
    }
    /**
     * Getter and Setter and Delete
     */
    get(key) {
        return this.getStorageImplementation().get(key);
        //return '';
    }
    set(key, value) {
        this.getStorageImplementation().set(key, value);
        return value;
    }
    delete(key) {
        this.getStorageImplementation().remove(key);
        return null;
    }
    deleteAll() {
        let allKeys = this.getAllKeys();
        for (let i = 0; i < allKeys.length; i++) {
            this.delete(allKeys[i]);
        }
    }
}
exports.DefaultStorage = DefaultStorage;
