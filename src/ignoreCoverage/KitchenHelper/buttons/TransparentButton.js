"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransparentButton = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const TransparentButton = (props) => {
    let content = props.children;
    return (<native_base_1.Button minWidth={154} bgColor={"#00000000"} {...props}>
			{content}
		</native_base_1.Button>);
};
exports.TransparentButton = TransparentButton;
