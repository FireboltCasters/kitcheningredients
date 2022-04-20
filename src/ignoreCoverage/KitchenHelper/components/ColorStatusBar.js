"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorStatusBar = void 0;
const expo_status_bar_1 = require("expo-status-bar");
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const ColorStatusBar = () => {
    const { colorMode, toggleColorMode } = (0, native_base_1.useColorMode)();
    return (<expo_status_bar_1.StatusBar style={colorMode === 'dark' ? 'light' : 'dark'} backgroundColor={colorMode == 'dark' ? '#27272a' : '#f3f2f2'} translucent={true}/>);
};
exports.ColorStatusBar = ColorStatusBar;
