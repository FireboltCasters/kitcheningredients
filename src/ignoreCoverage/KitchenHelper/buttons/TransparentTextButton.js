"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransparentTextButton = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const TransparentButton_1 = require("./TransparentButton");
const TransparentTextButton = (props) => {
    let content = props.children;
    return (<TransparentButton_1.TransparentButton {...props}>
			<native_base_1.Text {...props}>
				{content}
			</native_base_1.Text>
		</TransparentButton_1.TransparentButton>);
};
exports.TransparentTextButton = TransparentTextButton;
