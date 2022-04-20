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
exports.Login = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const WebViewLogin_1 = require("./WebViewLogin");
const EnviromentHelper_1 = __importDefault(require("../EnviromentHelper"));
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const NavigatorHelper_1 = require("../navigation/NavigatorHelper");
const App_1 = __importDefault(require("../App"));
const react_native_1 = require("react-native");
const Login = (props) => {
    let hideDrawer = false;
    if (!App_1.default.shouldHideDrawer()) {
        //console.log("Login calls hide drawer");
        hideDrawer = true;
    }
    if (react_native_1.Platform.OS !== "web") {
        hideDrawer = false;
    }
    //console.log("Login passed drawer Check")
    const user = App_1.default.getUser();
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [firstload, setFirstload] = (0, react_1.useState)(true);
    const params = NavigatorHelper_1.NavigatorHelper.getRouteParams(props);
    let directus_access_token = params[EnviromentHelper_1.default.getDirectusAccessTokenName()];
    async function fetchAccessTokenInUrl() {
        try {
            let data = await ServerAPI_1.default.loginWithAccessDirectusAccessToken(directus_access_token);
            let directus = ServerAPI_1.default.getClient();
            let me = await ServerAPI_1.default.getMe(directus);
            await App_1.default.setUser(me);
            return true;
        }
        catch (err) {
            console.log(err);
            console.log(Object.keys(err));
            if (err.code === 401) {
                console.log("Not allowed");
            }
            console.log("Not allowed");
            NavigatorHelper_1.NavigatorHelper.navigateWithoutParams(exports.Login);
        }
        return false;
    }
    function rerenderWithoutParams() {
        //console.log("App has found user, so we want to route without directus token");
        // https://reactnavigation.org/docs/navigating-without-navigation-prop/#handling-initialization
        //since the navigation isn't ready at the first rendering, we need to retrigger useEffect to render it then
        if (firstload) {
            setFirstload(false);
        }
        else {
            NavigatorHelper_1.NavigatorHelper.navigateWithoutParams(exports.Login);
        }
        return true;
    }
    async function fetchAccessToken() {
        //console.log("fetchAccessToken");
        if (!!directus_access_token) {
            if (!!user) {
                rerenderWithoutParams();
                return;
            }
            else {
                //console.log("Token in URL found");
                let successWithUrlToken = await fetchAccessTokenInUrl();
            }
        }
        else {
            //console.log("No access token in url, finish loading")
            setLoaded(true);
        }
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        //console.log("Login useEffect")
        if (App_1.default.shouldRedirectToLogin()) {
            App_1.default.setRedirectToLogin(false);
        }
        if (hideDrawer) {
            App_1.default.setHideDrawer(true);
        }
        else {
            fetchAccessToken();
        }
    }, [props.route.params, firstload]);
    let finishedLoading = loaded;
    if (!!directus_access_token) {
        finishedLoading = false;
    }
    if (hideDrawer) {
        return null;
    }
    return <WebViewLogin_1.WebViewLogin loaded={finishedLoading} user={user}/>;
};
exports.Login = Login;
