"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBackground = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const ServerInfoHelper_1 = require("../helper/ServerInfoHelper");
const DirectusImage_1 = require("./DirectusImage");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const ProjectBackground = (props) => {
    const serverInfo = props.serverInfo || ServerAPI_1.default.tempStore.serverInfo;
    let imageBackgroundAssetId = ServerInfoHelper_1.ServerInfoHelper.getProjectBackgroundAssetId(serverInfo);
    let project_color = ServerInfoHelper_1.ServerInfoHelper.getProjectColor(serverInfo);
    let fallbackStyle = {};
    if (!imageBackgroundAssetId) {
        fallbackStyle = { backgroundColor: project_color };
    }
    return (<native_base_1.View style={{ flex: 1 }}>
			<DirectusImage_1.DirectusImage alt={""} assetId={imageBackgroundAssetId} isPublic={true} style={[{ flex: 1 }, fallbackStyle]}/>
		</native_base_1.View>);
};
exports.ProjectBackground = ProjectBackground;
