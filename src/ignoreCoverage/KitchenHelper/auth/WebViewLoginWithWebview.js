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
exports.WebViewLoginWithWebview = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const react_native_webview_1 = require("react-native-webview");
const react_native_1 = require("react-native");
const native_base_1 = require("native-base");
const EnviromentHelper_1 = __importDefault(require("../EnviromentHelper"));
let webViewRef = (0, react_1.createRef)();
const FUNCTION_NAME_CHECK_COOKIES = "checkCookies";
const getJSCODEINJECTION = (backendURL) => {
    const CHECK_COOKIE = `	
	  ReactNativeWebView.postMessage("Cookie: " + document.cookie);
	  let ` + FUNCTION_NAME_CHECK_COOKIES + ` = async () => {
		try{
				console.log("Try to fetch");
				let answer = await fetch("` + backendURL + `/auth/refresh", {
					"headers": {
						"accept": "application/json, text/plain, */*",
						"accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
						"cache-control": "no-store",
						"pragma": "no-cache",
						"sec-gpc": "1"
					},
					"referrer": "` + backendURL + `/auth/refresh",
					"referrerPolicy": "strict-origin-when-cross-origin",
					"body": null,
					"method": "POST",
					"mode": "cors",
					"credentials": "include"
				});
				console.log(answer);
				let data = await answer.json();
				console.log(data);
				ReactNativeWebView.postMessage("Fetch: " + JSON.stringify(data));
			} catch (err){
				ReactNativeWebView.postMessage("Error: "+err);
				console.log(err);
			}
	  }
	  ` + FUNCTION_NAME_CHECK_COOKIES + `();
	  true;
	`;
    return CHECK_COOKIE;
};
const onNavigationStateChange = (backendURL, navigationState) => {
    if (!!webViewRef) {
        let injection = getJSCODEINJECTION(backendURL);
        webViewRef.current.injectJavaScript(FUNCTION_NAME_CHECK_COOKIES + "();");
    }
};
const onMessage = (setLoggedIn, event) => {
    const { data } = event.nativeEvent;
    if (data.includes('Cookie:')) {
        // process the cookies
        console.log(data);
    }
    if (data.includes('Cookie:') || data.includes('Fetch:') || data.includes('Error:')) {
        // process the cookies
        console.log(data);
    }
    if (data.includes('Fetch:')) {
        console.log(data);
        if (!data.includes("errors")) {
            // process the cookies
            setLoggedIn(true);
        }
    }
};
const WebViewLoginWithWebview = (props) => {
    let backendURL = EnviromentHelper_1.default.getBackendURL();
    console.log("backendURL: ", backendURL);
    let injection = getJSCODEINJECTION(backendURL);
    // Send the cookie information back to the mobile app
    let sourceURI = backendURL + "/";
    //sourceURI = "https://github.com/";
    console.log("sourceURI: ", sourceURI);
    const setLoggedIn = props.setLoggedIn;
    return (<native_base_1.View style={{ position: "absolute", top: 0, height: "100%", width: "100%" }}>
			<react_native_1.SafeAreaView />
			<react_native_webview_1.WebView style={{ height: "100%", width: "100%" }} ref={webViewRef} source={{ uri: sourceURI }} onNavigationStateChange={(navigationState) => onNavigationStateChange(backendURL, navigationState)} onMessage={(event) => onMessage(setLoggedIn, event)} javaScriptEnabled={true} injectedJavaScript={'function myFunction() {\n' +
            '  alert("Hello! I am an alert box!");\n' +
            '}'} sharedCookiesEnabled>
			</react_native_webview_1.WebView>
		</native_base_1.View>);
};
exports.WebViewLoginWithWebview = WebViewLoginWithWebview;
