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
exports.Settings = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const NavigatorHelper_1 = require("../../navigation/NavigatorHelper");
const DeveloperSettings_1 = require("./DeveloperSettings");
const Settings = (props) => {
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, [props.route.params]);
    function renderOpenDeveloperSettings() {
        return (<native_base_1.Button onPress={() => {
                NavigatorHelper_1.NavigatorHelper.navigate(DeveloperSettings_1.DeveloperSettings);
            }}><native_base_1.Text>{"Developer Settings"}</native_base_1.Text></native_base_1.Button>);
    }
    return (<>
			<native_base_1.View>
				{renderOpenDeveloperSettings()}
			</native_base_1.View>
		</>);
};
exports.Settings = Settings;
