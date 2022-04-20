"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectLogo = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const ServerInfoHelper_1 = require("../helper/ServerInfoHelper");
const DirectusImage_1 = require("./DirectusImage");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
let titleBoxHeight = 60;
const ProjectLogo = (props) => {
    const serverInfo = props.serverInfo || ServerAPI_1.default.tempStore.serverInfo;
    let project_color = ServerInfoHelper_1.ServerInfoHelper.getProjectColor(serverInfo);
    let project_logo_asset_id = ServerInfoHelper_1.ServerInfoHelper.getProjectLogoAssetId(serverInfo);
    let padding = props.menuBar ? 0 : 4;
    let borderRadius = props.menuBar ? 0 : 6;
    const heightAndWidth = titleBoxHeight + padding;
    return (
    // @ts-ignore
    <native_base_1.View style={{ height: heightAndWidth, width: heightAndWidth, backgroundColor: project_color, borderRadius: borderRadius, alignItems: "center", justifyContent: "center" }}>
			<DirectusImage_1.DirectusImage alt={""} isPublic={true} assetId={project_logo_asset_id} style={{ height: 40, width: 40 }}/>
		</native_base_1.View>);
};
exports.ProjectLogo = ProjectLogo;
