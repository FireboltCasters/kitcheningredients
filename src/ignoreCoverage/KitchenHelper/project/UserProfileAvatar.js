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
exports.UserProfileAvatar = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const DirectusImage_1 = require("./DirectusImage");
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const titleBoxHeight = 64;
const UserProfileAvatar = (props) => {
    const [displayUser, setUser] = (0, react_1.useState)(props.user || null);
    const [reloadnumber, setReloadnumber] = (0, react_1.useState)(0);
    const directus = ServerAPI_1.default.getClient();
    async function loadUserInformation() {
        let me = await ServerAPI_1.default.getMe(directus);
        setUser(me);
        setReloadnumber(reloadnumber + 1);
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        if (!props.user) {
            loadUserInformation();
        }
    }, []);
    let avatarAssetId = displayUser?.avatar;
    let content = (<native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"account-circle"} style={{}}/>);
    if (!!avatarAssetId) {
        content = <DirectusImage_1.DirectusImage reloadnumber={reloadnumber + ""} showLoading={true} assetId={avatarAssetId} style={{ height: "100%", width: "100%" }}/>;
    }
    let dimension = props.heightAndWidth || titleBoxHeight;
    if (!!props.onPress) {
        return (
        // @ts-ignore
        <react_native_1.TouchableOpacity onPress={props.onPress} style={{ height: dimension, width: dimension, borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
				{content}
			</react_native_1.TouchableOpacity>);
    }
    else {
        return (
        // @ts-ignore
        <native_base_1.View style={{ height: dimension, width: dimension, borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
				{content}
			</native_base_1.View>);
    }
};
exports.UserProfileAvatar = UserProfileAvatar;
