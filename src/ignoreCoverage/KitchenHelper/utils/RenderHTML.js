"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderHTML = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const react_native_1 = require("react-native");
const react_native_webview_1 = require("react-native-webview");
const RenderHTML = (props) => {
    let isWeb = react_native_1.Platform.OS === "web";
    if (isWeb) {
        return <native_base_1.View style={{ flex: 1 }}>
			<native_base_1.Text>
				<div dangerouslySetInnerHTML={{ __html: props.html }}/>
			</native_base_1.Text>
		</native_base_1.View>;
    }
    return (<react_native_webview_1.WebView style={props.style} source={{ html: props.html }}>
		</react_native_webview_1.WebView>);
};
exports.RenderHTML = RenderHTML;
