"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreakPointLayout = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const BreakPointValues_1 = __importDefault(require("./BreakPointValues"));
const BreakPointLayout = ({ children, navigation, title, doclink, navigateTo, _status, _hStack, ...props }) => {
    let widthValues = !!props.breakPointWidthValues ? props.breakPointWidthValues : BreakPointValues_1.default.getWidthValues();
    const boxWidth = (0, native_base_1.useBreakpointValue)(widthValues);
    return (<native_base_1.Box style={{ padding: BreakPointValues_1.default.padding, flex: 1, margin: 0, alignItems: "flex-start" }} {...props} flex={1} px={4} mx="auto" pt={navigation ? '70px' : 0} width={boxWidth}>
					{children}
			</native_base_1.Box>);
    // { base: '100%', lg: '768px', xl: '1080px' }
};
exports.BreakPointLayout = BreakPointLayout;
