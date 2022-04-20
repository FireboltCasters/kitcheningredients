"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBanner = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const ProjectLogo_1 = require("./ProjectLogo");
const ProjectName_1 = require("./ProjectName");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const titleBoxHeight = 64;
const ProjectBanner = (props) => {
    const serverInfo = props.serverInfo || ServerAPI_1.default.tempStore.serverInfo;
    return (<native_base_1.View style={{ flexDirection: "row", height: titleBoxHeight }}>
			<ProjectLogo_1.ProjectLogo serverInfo={serverInfo}/>
			<ProjectName_1.ProjectName serverInfo={serverInfo}/>
		</native_base_1.View>);
};
exports.ProjectBanner = ProjectBanner;
