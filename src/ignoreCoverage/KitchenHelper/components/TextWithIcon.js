"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextWithIcon = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const vector_icons_1 = require("@expo/vector-icons");
const TextWithIcon = (props) => {
    function renderRowInformation(icon, content) {
        let renderedIcon = !!icon ? <native_base_1.Text><native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={icon} marginRight={15}/></native_base_1.Text> : null;
        return (<native_base_1.View style={{ alignItems: "center", flexDirection: "row", margin: 3 }}>
				{renderedIcon}<native_base_1.Text>{content}</native_base_1.Text>
			</native_base_1.View>);
    }
    return (renderRowInformation(props.icon, props.children));
};
exports.TextWithIcon = TextWithIcon;
