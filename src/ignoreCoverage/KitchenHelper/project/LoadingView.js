"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingView = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const LoadingView = (props) => {
    const styles = {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.7,
        justifyContent: "center",
        alignItems: "center",
    };
    return (<native_base_1.View style={styles}>
			<native_base_1.Skeleton height={"100%"} width={"100%"}/>
		</native_base_1.View>);
};
exports.LoadingView = LoadingView;
