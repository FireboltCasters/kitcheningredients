"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalLink = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const TransparentButton_1 = require("../buttons/TransparentButton");
const NavigatorHelper_1 = require("./NavigatorHelper");
const InternalLink = (props) => {
    let content = props.children;
    let beforeNavigateCallback = props.beforeNavigateCallback;
    let afterNavigateCallback = props.afterNavigateCallback;
    return (<TransparentButton_1.TransparentButton onPress={async () => {
            if (!!beforeNavigateCallback) {
                await beforeNavigateCallback();
            }
            NavigatorHelper_1.NavigatorHelper.navigateWithoutParams(props.destination);
            if (!!afterNavigateCallback) {
                await afterNavigateCallback();
            }
        }} {...props}>
			<native_base_1.Text {...props} fontSize={props.fontSize}>
				{content}
			</native_base_1.Text>
		</TransparentButton_1.TransparentButton>);
};
exports.InternalLink = InternalLink;
