"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchedVariableInterface = void 0;
class SynchedVariableInterface {
    key;
    defaultValue;
    beforeHook;
    afterHook;
    constructor(key, defaultValue, beforeHook, afterHook) {
        this.key = key;
        this.defaultValue = defaultValue;
        this.beforeHook = beforeHook;
        this.afterHook = afterHook;
    }
}
exports.SynchedVariableInterface = SynchedVariableInterface;
