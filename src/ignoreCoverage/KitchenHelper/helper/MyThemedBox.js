"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyThemedBox = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const MyThemedBox = (props) => {
    let level = props._shadeLevel || 0;
    const maxLevel = 9;
    const minLevel = 0;
    level = Math.min(maxLevel, Math.max(minLevel, level));
    function getShadeByLevel(level) {
        if (level === 0)
            return 50;
        return level * 100;
    }
    let themeLevel = (0, native_base_1.useColorModeValue)(level, maxLevel - level);
    let _myThemeShade = getShadeByLevel(themeLevel);
    const childrenWithProps = react_1.default.Children.map(props.children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (react_1.default.isValidElement(child)) {
            // @ts-ignore
            return react_1.default.cloneElement(child, { _shadeLevel: level + 1 });
        }
        return child;
    });
    return (<native_base_1.Box _light={{
            bg: 'coolGray.' + _myThemeShade,
        }} _dark={{
            bg: 'blueGray.' + _myThemeShade,
        }} {...props}>
			{childrenWithProps}
		</native_base_1.Box>);
};
exports.MyThemedBox = MyThemedBox;
