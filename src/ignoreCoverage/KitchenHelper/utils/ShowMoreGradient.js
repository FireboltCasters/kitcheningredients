"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowMoreGradient = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const expo_linear_gradient_1 = require("expo-linear-gradient");
const ShowMoreGradientPlaceholder_1 = __importDefault(require("./ShowMoreGradientPlaceholder"));
const App_1 = __importDefault(require("../App"));
const ShowMoreGradient = (props) => {
    const [lightBg, darkBg] = (0, native_base_1.useToken)('colors', [App_1.default.styleConfig.backgroundColor.light, App_1.default.styleConfig.backgroundColor.dark], 'blueGray.900');
    const bgColor = (0, native_base_1.useColorModeValue)(lightBg, darkBg);
    const gradColors = [bgColor + '00', bgColor + 'FF'];
    return (<native_base_1.View style={[{ width: "100%", position: "absolute", bottom: 0, height: "auto" }]}>
			<ShowMoreGradientPlaceholder_1.default />
			<native_base_1.View style={{ position: "absolute", height: "100%", width: "100%", bottom: 0 }}>
				<expo_linear_gradient_1.LinearGradient style={{ flex: 4 }} colors={gradColors} pointerEvents={'none'}/>
				<native_base_1.View style={{ flex: 1, backgroundColor: bgColor }}/>
			</native_base_1.View>
		</native_base_1.View>);
};
exports.ShowMoreGradient = ShowMoreGradient;
