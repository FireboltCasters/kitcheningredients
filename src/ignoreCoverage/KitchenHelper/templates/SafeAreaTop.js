"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAreaTop = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const SafeAreaTop = ({ children, navigation, title, doclink, navigateTo, _status, _hStack, ...props }) => {
    const safeArea = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    return (<native_base_1.Box {...props} height={safeArea.top} _web={{
            pt: {
                base: 6,
                sm: 6,
                md: 0,
            },
        }}/>);
};
exports.SafeAreaTop = SafeAreaTop;
