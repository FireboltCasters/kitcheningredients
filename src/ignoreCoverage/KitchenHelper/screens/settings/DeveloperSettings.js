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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeveloperSettings = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const MyThemedBox_1 = require("../../helper/MyThemedBox");
const App_1 = __importDefault(require("../../App"));
const SynchedVariable_1 = require("./../../storage/SynchedVariable");
const SettingsValue_1 = require("./SettingsValue");
const RequiredStorageKeys_1 = require("../../storage/RequiredStorageKeys");
const ThemeChanger_1 = require("../../theme/ThemeChanger");
const ServerAPI_1 = __importDefault(require("../../ServerAPI"));
const SynchedState_1 = __importDefault(require("../../synchedstate/SynchedState"));
const DeveloperSettings = (props) => {
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
    }, [props.route.params]);
    function renderStorage() {
        let output = [];
        let requiredStorageKeys = SynchedState_1.default.getRequiredStorageKeys();
        console.log("requiredStorageKeys: ", requiredStorageKeys);
        let pluginStorageKeys = SynchedState_1.default.getPluginStorageKeys();
        let requiredSynchedStates = SynchedState_1.default.getRequiredSynchedStates();
        let pluginSynchedStates = SynchedState_1.default.getPluginSynchedStates();
        let allKeys = [];
        allKeys = allKeys.concat(requiredStorageKeys);
        allKeys = allKeys.concat(pluginStorageKeys);
        allKeys = allKeys.concat(requiredSynchedStates);
        allKeys = allKeys.concat(pluginSynchedStates);
        console.log("Render All Keys");
        console.log(allKeys);
        //console.log("renderStorage")
        for (let i = 0; i < allKeys.length; i++) {
            let storageKey = allKeys[i];
            console.log("renderStorage: storageKey: ", storageKey);
            if (storageKey === RequiredStorageKeys_1.RequiredStorageKeys.THEME) {
                output.push(<MyThemedBox_1.MyThemedBox style={{ margin: 5, padding: 5 }} _shadeLevel={2}>
						<native_base_1.Text>{storageKey}</native_base_1.Text>
						<ThemeChanger_1.ThemeChanger><native_base_1.Text>{"Switch"}</native_base_1.Text></ThemeChanger_1.ThemeChanger>
					</MyThemedBox_1.MyThemedBox>);
            }
            else {
                output.push(<SynchedVariable_1.SynchedVariable storageKey={storageKey} key={storageKey}>
						<SettingsValue_1.SettingsValue />
					</SynchedVariable_1.SynchedVariable>);
            }
        }
        return output;
    }
    function renderResetSettings() {
        return (<>
				<native_base_1.Text fontSize={30} bold={true}>DANGER:</native_base_1.Text>
				<MyThemedBox_1.MyThemedBox style={{ margin: 5, padding: 5 }} _shadeLevel={2}>
					<native_base_1.Text>{"Reset App"}</native_base_1.Text>
					<native_base_1.Button onPress={async () => {
                await ServerAPI_1.default.handleLogout();
                App_1.default.storage.deleteAll();
            }}><native_base_1.Text>{"Delete"}</native_base_1.Text></native_base_1.Button>
				</MyThemedBox_1.MyThemedBox>
			</>);
    }
    return (<>
			<native_base_1.View>
				<MyThemedBox_1.MyThemedBox>
					<native_base_1.Text fontSize={30} bold={true}>STORAGE:</native_base_1.Text>
					{renderStorage()}
				</MyThemedBox_1.MyThemedBox>
				{renderResetSettings()}
			</native_base_1.View>
		</>);
};
exports.DeveloperSettings = DeveloperSettings;
