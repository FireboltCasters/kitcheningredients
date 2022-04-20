"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollViewWithGradient = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const ShowMoreGradient_1 = require("./ShowMoreGradient");
const ScrollViewWithGradient = (props) => {
    let hideGradient = props.hideGradient;
    let renderedGradient = hideGradient ? null : <ShowMoreGradient_1.ShowMoreGradient />;
    return (<>
			<react_native_1.ScrollView style={props.style} contentContainerStyle={{ width: '100%', alignItems: "center" }} showsVerticalScrollIndicator={true}>
				{props.children}
			</react_native_1.ScrollView>
			{renderedGradient}
		</>);
};
exports.ScrollViewWithGradient = ScrollViewWithGradient;
