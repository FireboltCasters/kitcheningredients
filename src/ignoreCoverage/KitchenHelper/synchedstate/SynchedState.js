"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSynchedState = void 0;
const easy_peasy_1 = require("easy-peasy");
const SynchedVariableInterface_1 = require("../storage/SynchedVariableInterface");
const KeyExtractorHelper_1 = require("../storage/KeyExtractorHelper");
const RequiredStorageKeys_1 = require("../storage/RequiredStorageKeys");
const App_1 = __importDefault(require("../App"));
const RequiredSynchedStates_1 = require("./RequiredSynchedStates");
function useSynchedState(storageKey) {
    const value = (0, easy_peasy_1.useStoreState)((state) => state[storageKey].value);
    const setValue = (0, easy_peasy_1.useStoreActions)((actions) => actions[storageKey].setValue);
    return [
        value,
        setValue
    ];
}
exports.useSynchedState = useSynchedState;
class SynchedState {
    static store;
    static globalSynchedStoreModels = {};
    static getContextStore() {
        return SynchedState.store;
    }
    static getRequiredStorageKeys() {
        return KeyExtractorHelper_1.KeyExtractorHelper.getListOfStaticKeyValues(RequiredStorageKeys_1.RequiredStorageKeys);
    }
    static getPluginStorageKeys() {
        if (!!App_1.default.plugin) {
            return KeyExtractorHelper_1.KeyExtractorHelper.getListOfStaticKeyValues(App_1.default.plugin.getStorageKeysClass());
        }
        return [];
    }
    static getRequiredSynchedStates() {
        return KeyExtractorHelper_1.KeyExtractorHelper.getListOfStaticKeyValues(RequiredSynchedStates_1.RequiredSynchedStates);
    }
    static getPluginSynchedStates() {
        if (!!App_1.default.plugin) {
            return KeyExtractorHelper_1.KeyExtractorHelper.getListOfStaticKeyValues(App_1.default.plugin.getSynchedStateKeysClass());
        }
        return [];
    }
    static registerSynchedState(key, defaultValue, beforeHook, afterHook, override = false) {
        let additionalModel = SynchedState.globalSynchedStoreModels[key];
        if (!!additionalModel && !override) {
            return new Error("Additional variable for storage already exists for that key: " + key);
        }
        SynchedState.globalSynchedStoreModels[key] = new SynchedVariableInterface_1.SynchedVariableInterface(key, defaultValue, beforeHook, afterHook);
    }
    static registerSynchedStates(listOfKeys, defaultValue, beforeHook, afterHook, override = false) {
        if (typeof listOfKeys === 'string') {
            listOfKeys = [listOfKeys];
        }
        for (let i = 0; i < listOfKeys.length; i++) {
            let key = listOfKeys[i];
            SynchedState.registerSynchedState(key, defaultValue, beforeHook, afterHook, override);
        }
    }
    static handleAction(storageKey, state, payload, aditionalStoreModel) {
        let beforeHook = aditionalStoreModel.beforeHook;
        let afterHook = aditionalStoreModel.afterHook;
        let cancel = false;
        if (!!beforeHook) {
            cancel = !beforeHook(storageKey, state, payload);
        }
        if (!cancel) {
            state.value = payload;
            if (!!afterHook) {
                afterHook(storageKey, state, payload);
            }
        }
    }
    static initSynchedKeys() {
        SynchedState.registerSynchedStates(SynchedState.getRequiredSynchedStates());
        SynchedState.registerSynchedStates(SynchedState.getPluginSynchedStates());
    }
    static initContextStores() {
        let model = {};
        let additionalKeys = Object.keys(SynchedState.globalSynchedStoreModels);
        for (let i = 0; i < additionalKeys.length; i++) {
            let key = additionalKeys[i];
            let aditionalStoreModel = SynchedState.globalSynchedStoreModels[key];
            let storageKey = aditionalStoreModel.key;
            model[storageKey] = {
                value: aditionalStoreModel.defaultValue,
                setValue: (0, easy_peasy_1.action)((state, payload) => {
                    SynchedState.handleAction(storageKey, state, payload, aditionalStoreModel);
                })
            };
        }
        const store = (0, easy_peasy_1.createStore)(model);
        SynchedState.store = store;
    }
}
exports.default = SynchedState;
