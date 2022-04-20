"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsButton = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const vector_icons_1 = require("@expo/vector-icons");
const NavigatorHelper_1 = require("../../navigation/NavigatorHelper");
const Settings_1 = require("./Settings");
const TransparentTextButton_1 = require("../../buttons/TransparentTextButton");
const SettingsButton = (props) => {
    function handleOpen() {
        NavigatorHelper_1.NavigatorHelper.navigate(Settings_1.Settings);
    }
    function renderOnlyIcon() {
        return (<native_base_1.Button key={"SettingsIcon"} style={{ backgroundColor: "transparent" }} onPress={handleOpen}>
				<native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"cog"}/>
			</native_base_1.Button>);
    }
    function renderLogoutText() {
        return (<TransparentTextButton_1.TransparentTextButton key={"logoutTextButton"} onPress={handleOpen}>
				<native_base_1.Text>{"Settings"}</native_base_1.Text>
			</TransparentTextButton_1.TransparentTextButton>);
    }
    let content = [];
    if (props.onlyIcon) {
        content.push(renderOnlyIcon());
    }
    else {
        content.push(renderLogoutText());
    }
    return content;
};
exports.SettingsButton = SettingsButton;
