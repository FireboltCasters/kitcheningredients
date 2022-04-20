"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeChanger = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ColorCodeHelper_1 = __importDefault(require("./ColorCodeHelper"));
const SynchedState_1 = require("../synchedstate/SynchedState");
const RequiredStorageKeys_1 = require("../storage/RequiredStorageKeys");
const react_native_1 = require("react-native");
const ThemeChanger = (props) => {
    let storageKey = RequiredStorageKeys_1.RequiredStorageKeys.THEME;
    const [value, setValue] = (0, SynchedState_1.useSynchedState)(storageKey);
    const { colorMode, toggleColorMode } = (0, native_base_1.useColorMode)();
    let nextTheme = colorMode === ColorCodeHelper_1.default.VALUE_THEME_LIGHT ? ColorCodeHelper_1.default.VALUE_THEME_DARK : ColorCodeHelper_1.default.VALUE_THEME_LIGHT;
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, [colorMode]);
    return (<react_native_1.TouchableOpacity onPress={() => {
            setValue(nextTheme);
            toggleColorMode();
        }}>
			{props.children}
		</react_native_1.TouchableOpacity>);
};
exports.ThemeChanger = ThemeChanger;
