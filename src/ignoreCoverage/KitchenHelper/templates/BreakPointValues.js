"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_base_1 = require("native-base");
class BreakPointValues {
    static padding = 16;
    static WIDTH_MD = 768 - BreakPointValues.padding;
    static WIDTH_LG = 992 - BreakPointValues.padding;
    static WIDTH_XL = 1536 - BreakPointValues.padding;
    static getWidthValues() {
        return {
            "base": '100%',
            "md": BreakPointValues.WIDTH_MD + 'px',
            "lg": BreakPointValues.WIDTH_LG + 'px',
            "xl": BreakPointValues.WIDTH_XL + 'px',
        };
    }
    static getSmallDeviceValues() {
        return {
            base: true,
            md: false,
        };
    }
    static usesSmallDevice() {
        return (0, native_base_1.useBreakpointValue)(BreakPointValues.getSmallDeviceValues());
    }
}
exports.default = BreakPointValues;
