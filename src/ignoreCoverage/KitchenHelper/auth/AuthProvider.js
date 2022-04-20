"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const vector_icons_1 = require("@expo/vector-icons");
const EnviromentHelper_1 = __importDefault(require("../EnviromentHelper"));
const StringHelper_1 = require("../helper/StringHelper");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const URL_Helper_1 = require("../helper/URL_Helper");
const react_native_1 = require("react-native");
const ServerInfoHelper_1 = require("../helper/ServerInfoHelper");
const AuthProvider = ({ serverInfo, provider, buttonText, callback }) => {
    function getUrlToProvider(provider) {
        provider = provider.toLowerCase();
        let currentLocation = URL_Helper_1.URL_Helper.getCurrentLocationWithoutQueryParams();
        let redirectURL = currentLocation;
        let redirect_with_access_token = "?redirect=" + ServerAPI_1.default.getAPIUrl() + "/redirect-with-token?redirect=" + redirectURL + "?" + EnviromentHelper_1.default.getDirectusAccessTokenName() + "=";
        return ServerAPI_1.default.getAPIUrl() + "/auth/login/" + provider + redirect_with_access_token;
    }
    function renderIcon(icon, color) {
        return (<native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={icon} color={color} style={{}}/>);
    }
    let providerName = provider?.name || "";
    let icon = provider?.icon;
    const { colorMode, toggleColorMode } = (0, native_base_1.useColorMode)();
    let ssoIconStyle = ServerInfoHelper_1.ServerInfoHelper.getSsoIconStyle(serverInfo);
    let iconBackgroundColor = ssoIconStyle?.background;
    let iconColor = ssoIconStyle?.color || (colorMode == 'dark' ? 'white' : 'gray.800');
    let url = getUrlToProvider(providerName);
    let providerNameReadable = StringHelper_1.StringHelper.capitalizeFirstLetter(providerName);
    let text = buttonText || "Log in with " + providerNameReadable;
    let content = (<native_base_1.Flex direction={"row"} _light={{ backgroundColor: "rgb(240, 244, 249)" }} _dark={{ backgroundColor: "darkgray" }} style={{ borderRadius: 6, flex: 1, margin: 12 }}>
			<native_base_1.View style={{ height: 60, width: 60, alignItems: "center", justifyContent: "center", backgroundColor: iconBackgroundColor, borderRadius: 6 }}>
				{renderIcon(icon, ssoIconStyle.color)}
			</native_base_1.View>
			<native_base_1.View style={{ justifyContent: "center", flex: 1, paddingLeft: 20 }}>
				<native_base_1.Text>{text}</native_base_1.Text>
			</native_base_1.View>
		</native_base_1.Flex>);
    if (!!callback) {
        return (<react_native_1.TouchableOpacity onPress={() => { callback(); }}>
				{content}
			</react_native_1.TouchableOpacity>);
    }
    return (<native_base_1.Link key={"Link" + providerName} href={url}>
			{content}
		</native_base_1.Link>);
};
exports.AuthProvider = AuthProvider;
