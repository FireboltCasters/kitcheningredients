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
exports.BaseTemplate = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const Layout_1 = require("./Layout");
const ScrollViewWithGradient_1 = require("../utils/ScrollViewWithGradient");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const native_base_1 = require("native-base");
const BreakPointLayout_1 = require("./BreakPointLayout");
const ShowMoreGradientPlaceholder_1 = __importDefault(require("../utils/ShowMoreGradientPlaceholder"));
const CookieInformation_1 = require("../screens/legalRequirements/CookieInformation");
const react_native_1 = require("react-native");
const BaseTemplate = ({ children, navigation, title, navigateTo, serverInfo, _status, _hStack, ...props }) => {
    const [reloadnumber, setReloadnumber] = (0, react_1.useState)(0);
    const [remoteServerInfo, setServerInfo] = (0, react_1.useState)(undefined);
    async function loadServerInfo() {
        try {
            let serverInfoRemote = await ServerAPI_1.default.getServerInfo();
            setServerInfo(serverInfoRemote);
            setReloadnumber(reloadnumber + 1);
        }
        catch (err) {
            console.log("Error at get Server Info");
            console.log(err);
        }
    }
    // corresponding componentDidMount
    (0, react_1.useEffect)(() => {
        if (!serverInfo) {
            loadServerInfo();
        }
    }, [props.route.params]);
    return (<react_native_1.SafeAreaView style={{ height: "100%", width: "100%" }}>
		<native_base_1.View flex={1} flexDirection={"row"}>
		<Layout_1.Layout title={title} serverInfo={serverInfo}>
			<ScrollViewWithGradient_1.ScrollViewWithGradient hideGradient={true} style={{ width: "100%", height: "100%" }}>
				<BreakPointLayout_1.BreakPointLayout>
					<native_base_1.Box style={{ height: "100%", alignItems: "flex-start", width: "100%" }}>
						{children}
						<ShowMoreGradientPlaceholder_1.default />
					</native_base_1.Box>
				</BreakPointLayout_1.BreakPointLayout>
			</ScrollViewWithGradient_1.ScrollViewWithGradient>
		</Layout_1.Layout>
		<CookieInformation_1.CookieInformation />
		</native_base_1.View>
		</react_native_1.SafeAreaView>);
};
exports.BaseTemplate = BaseTemplate;
