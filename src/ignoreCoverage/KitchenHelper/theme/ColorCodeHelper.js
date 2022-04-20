"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_native_1 = require("react-native");
const RequiredStorageKeys_1 = require("../storage/RequiredStorageKeys");
//TODO dont save it directly into storage, use synched storage variable
class ColorCodeHelper {
    static VALUE_THEME_DARK = 'dark';
    static VALUE_THEME_LIGHT = 'light';
    static VALUE_THEME_DEFAULT = ColorCodeHelper.VALUE_THEME_LIGHT;
    static getSystemPreferedColor() {
        const colorScheme = react_native_1.Appearance.getColorScheme();
        if (colorScheme === 'dark') {
            // Use dark color scheme
            return ColorCodeHelper.VALUE_THEME_DARK;
        }
        return ColorCodeHelper.VALUE_THEME_LIGHT;
    }
    static async getColorModeFromStorage() {
        try {
            let val = await async_storage_1.default.getItem(RequiredStorageKeys_1.RequiredStorageKeys.THEME);
            if (!val) {
                return ColorCodeHelper.getSystemPreferedColor();
            }
            return val === ColorCodeHelper.VALUE_THEME_DARK ? ColorCodeHelper.VALUE_THEME_DARK : ColorCodeHelper.VALUE_THEME_LIGHT;
        }
        catch (e) {
            console.log(e);
            return ColorCodeHelper.VALUE_THEME_DEFAULT;
        }
    }
    static async setColorModeToStorage(value) {
        try {
            await async_storage_1.default.setItem(RequiredStorageKeys_1.RequiredStorageKeys.THEME, value);
        }
        catch (e) {
            console.log(e);
        }
    }
    static getManager() {
        return {
            get: async () => {
                return await ColorCodeHelper.getColorModeFromStorage();
            },
            set: async (value) => {
                await ColorCodeHelper.setColorModeToStorage(value);
            },
        };
    }
}
exports.default = ColorCodeHelper;
