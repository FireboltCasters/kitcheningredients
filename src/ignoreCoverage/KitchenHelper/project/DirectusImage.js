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
exports.DirectusImage = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const App_1 = __importDefault(require("../App"));
const LoadingView_1 = require("./LoadingView");
const react_native_1 = require("react-native");
const DirectusImage = (props) => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    // TODO: https://docs.directus.io/configuration/project-settings/#files-thumbnails
    // add key, fit, width, etc. as parameters here also
    //{height: "40px", width: "40px"}
    let content = null;
    if (!!props.assetId) {
        let imageURL = ServerAPI_1.default.getAssetImageURL(props.assetId);
        let url = imageURL;
        console.log(url);
        if (!props.isPublic) {
            let token = App_1.default.storage.get_auth_access_token();
            if (!!url && !!token) {
                if (!url.includes("?")) {
                    url += "?";
                }
                url += "&access_token=" + token;
            }
        }
        let source = {
            uri: url
        };
        content = (<>
			<native_base_1.Image source={source} alt={props.alt} style={props.style} ignoreFallback={true} onLoadEnd={() => {
                setLoading(false);
            }}/>
			{props.showLoading && loading && <LoadingView_1.LoadingView />}
		</>);
    }
    let pressWrapper = content;
    if (!!props.onPress) {
        pressWrapper = (<react_native_1.TouchableOpacity onPress={props.onPress} style={props.style}>
				{content}
			</react_native_1.TouchableOpacity>);
    }
    return (<native_base_1.View style={props.style}>
			{pressWrapper}
		</native_base_1.View>);
};
exports.DirectusImage = DirectusImage;
