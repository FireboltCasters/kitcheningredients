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
exports.Debug = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ServerAPI_1 = __importDefault(require("../../ServerAPI"));
const SettingsValue_1 = require("../settings/SettingsValue");
const SynchedVariable_1 = require("../../storage/SynchedVariable");
const RequiredStorageKeys_1 = require("../../storage/RequiredStorageKeys");
const SynchedState_1 = require("../../synchedstate/SynchedState");
const Debug = (props) => {
    const [ms, setMs] = (0, react_1.useState)(null);
    const [date, setDate] = (0, react_1.useState)(new Date());
    const [info, setInfo] = (0, react_1.useState)(null);
    const [refreshToken, setRefreshToken] = (0, SynchedState_1.useSynchedState)(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN);
    const [accessToken, setAccessToken] = (0, SynchedState_1.useSynchedState)(RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN);
    const timer = (0, react_1.useRef)(null); // we can save timer in useRef and pass it to child
    async function downloadServerStatus() {
        let directus = ServerAPI_1.default.getClient();
        let startTime = performance.now();
        await directus.server.ping();
        let endTime = performance.now();
        let msCalculated = endTime - startTime;
        msCalculated = parseInt(msCalculated.toFixed(0));
        setMs(msCalculated);
        setDate(new Date());
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        downloadServerStatus();
        timer.current = setInterval(() => { downloadServerStatus(); }, 1000);
        // this will clear Interval
        // clear on component unmount
        return () => {
            clearInterval(timer.current);
        };
    }, [props.route.params]);
    return (<>
			<native_base_1.Text>{"Debug Screen"}</native_base_1.Text>
			<native_base_1.Text>{"MS: " + ms}</native_base_1.Text>
			<native_base_1.Text>{date.toString()}</native_base_1.Text>
			<native_base_1.View style={{ width: "500px", margin: "40px" }}>
				<SynchedVariable_1.SynchedVariable storageKey={RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN} key={RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_REFRESH_TOKEN}>
					<SettingsValue_1.SettingsValue />
				</SynchedVariable_1.SynchedVariable>

				<SynchedVariable_1.SynchedVariable storageKey={RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN} key={RequiredStorageKeys_1.RequiredStorageKeys.KEY_AUTH_ACCESS_TOKEN}>
					<SettingsValue_1.SettingsValue />
				</SynchedVariable_1.SynchedVariable>
			</native_base_1.View>



		</>);
};
exports.Debug = Debug;
