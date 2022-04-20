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
exports.AuthProvidersLoginOptions = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const AuthProvider_1 = require("./AuthProvider");
const native_base_1 = require("native-base");
const AuthProviderGuest_1 = require("./AuthProviderGuest");
const AuthProvidersLoginOptions = (props) => {
    const showExternalLogins = true;
    const showGuestLogin = true;
    const [firstFetch, setfirstFetch] = (0, react_1.useState)(true);
    const [authProviders, setAuthProviders] = (0, react_1.useState)(undefined);
    const [reloadnumber, setReloadnumber] = (0, react_1.useState)(0);
    const [serverInfo, setServerInfo] = (0, react_1.useState)({});
    async function loadServerInfo() {
        try {
            let serverInfoRemote = await ServerAPI_1.default.getServerInfo();
            setServerInfo(serverInfoRemote);
            setReloadnumber(reloadnumber + 1);
        }
        catch (err) {
            console.log("Error at get Server Info");
            console.log(err);
        }
    }
    async function fetchAuthProviders() {
        try {
            let providers = await ServerAPI_1.default.getAuthProviders();
            setAuthProviders(providers);
            setReloadnumber(reloadnumber + 1);
        }
        catch (err) {
            console.log(err);
        }
    }
    function renderAuthProvider(provider) {
        return <AuthProvider_1.AuthProvider key={"externalProvider" + provider?.name} provider={provider} serverInfo={serverInfo}/>;
    }
    function renderAuthProviderGuest() {
        return <AuthProviderGuest_1.AuthProviderGuest serverInfo={serverInfo} key={"guest"}/>;
    }
    function renderAuthProviders() {
        let output = [];
        if (showGuestLogin) {
            output.push(renderAuthProviderGuest());
        }
        if (showExternalLogins) {
            if (!!authProviders) {
                for (let provider of authProviders) {
                    output.push(renderAuthProvider(provider));
                }
            }
        }
        return (<native_base_1.View style={{ flex: 1 }}>
				{output}
			</native_base_1.View>);
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        if (firstFetch) {
            setfirstFetch(false);
            fetchAuthProviders();
            loadServerInfo();
        }
    }, []);
    return (<native_base_1.View style={{ flex: 1 }}>
			{renderAuthProviders()}
		</native_base_1.View>);
};
exports.AuthProvidersLoginOptions = AuthProvidersLoginOptions;
