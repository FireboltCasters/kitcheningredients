"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerInfoHelper = void 0;
const EnviromentHelper_1 = __importDefault(require("../EnviromentHelper"));
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const CSS_Helper_1 = require("./CSS_Helper");
class ServerInfoHelper {
    static getProjectName(serverInfo) {
        return serverInfo?.project?.project_name;
    }
    static getProjectColor(serverInfo) {
        return serverInfo?.project?.project_color;
    }
    static getProjectLogoAssetId(serverInfo) {
        return serverInfo?.project?.project_logo;
    }
    static getProjectLogoURL(serverInfo) {
        return ServerAPI_1.default.getAssetImageURL(ServerInfoHelper.getProjectLogoAssetId(serverInfo));
    }
    static getProjectBackgroundAssetId(serverInfo) {
        return serverInfo?.project?.public_background;
    }
    static getProjectBackgroundURL(serverInfo) {
        return ServerAPI_1.default.getAssetImageURL(ServerInfoHelper.getProjectBackgroundAssetId(serverInfo));
    }
    static getProjectVersion() {
        let manifest = EnviromentHelper_1.default.getAppManifest();
        return !!manifest?.version ? manifest.version : "";
    }
    static getSsoIconStyle(serverInfo) {
        let custom_css = serverInfo?.project?.custom_css || ""; // custom_css:
        let parsed_css = CSS_Helper_1.CSS_Helper.parseCssToSelectorMap(custom_css);
        let customSsoIconStyle = parsed_css?.[".sso-icon"] || {};
        let project_color = ServerInfoHelper.getProjectColor(serverInfo);
        customSsoIconStyle.background = customSsoIconStyle?.background || project_color;
        customSsoIconStyle.color = customSsoIconStyle?.color || "white";
        return customSsoIconStyle;
    }
}
exports.ServerInfoHelper = ServerInfoHelper;
