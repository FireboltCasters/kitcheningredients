"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectName = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const ServerInfoHelper_1 = require("../helper/ServerInfoHelper");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const ProjectName = (props) => {
    const serverInfo = props.serverInfo || ServerAPI_1.default.tempStore.serverInfo;
    let project_name = ServerInfoHelper_1.ServerInfoHelper.getProjectName(serverInfo);
    let project_color = ServerInfoHelper_1.ServerInfoHelper.getProjectColor(serverInfo);
    let project_version = ServerInfoHelper_1.ServerInfoHelper.getProjectVersion();
    let color = project_color;
    if (props.themedColor) {
        color = null;
    }
    function renderVersion() {
        return (<native_base_1.View style={{ marginTop: 8, marginLeft: 4, display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
				<native_base_1.Text fontSize={"sm"} color={color}>
					{"v" + project_version}
				</native_base_1.Text>
			</native_base_1.View>);
    }
    return (<native_base_1.View style={{ marginTop: 2, marginLeft: 16, justifyContent: "center" }}>
			<native_base_1.Text fontSize="2xl" fontWeight={"bold"} color={color}>
				{project_name}
			</native_base_1.Text>
			{renderVersion()}
		</native_base_1.View>);
};
exports.ProjectName = ProjectName;
