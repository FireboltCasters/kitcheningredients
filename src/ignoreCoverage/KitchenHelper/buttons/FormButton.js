"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormButton = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const FormButton = (props) => {
    let loading = props.loading;
    function getLoadingContent() {
        return (<native_base_1.HStack space={2} alignItems="center">
				<native_base_1.Spinner accessibilityLabel="Loading posts"/>
			</native_base_1.HStack>);
    }
    let content = props.children;
    if (loading) {
        content = getLoadingContent();
    }
    return (
    //use inline style for backgroundColor ! Weird bug if pressing a button otherwise
    <native_base_1.Button borderColor={"#00000000"} minWidth={154} {...props}>
			{content}
		</native_base_1.Button>);
};
exports.FormButton = FormButton;
