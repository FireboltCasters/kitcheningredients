"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsValue = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const MyThemedBox_1 = require("../../helper/MyThemedBox");
const SettingsValue = (props) => {
    const [text, setText] = react_1.default.useState(props.value);
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, []);
    const handleChange = (event) => setText(event.target.value);
    function renderValue() {
        if (props.readOnly) {
            return (<native_base_1.Text>{text}</native_base_1.Text>);
        }
        else {
            return (<>
				<native_base_1.Input value={text} w={"100%"} onChange={handleChange} placeholder="Value Controlled Input"/>
				<native_base_1.Button onPress={() => {
                    props.setValue(text);
                }}>{"Change"}</native_base_1.Button>
			</>);
        }
    }
    return (<>
			<MyThemedBox_1.MyThemedBox style={{ margin: 5, padding: 5 }} _shadeLevel={2}>
				<native_base_1.Text>{props.storageKey}</native_base_1.Text>
				{renderValue()}
			</MyThemedBox_1.MyThemedBox>
		</>);
};
exports.SettingsValue = SettingsValue;
