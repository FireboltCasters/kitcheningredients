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
exports.LoginTemplate = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const native_base_1 = require("native-base");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const Floaters_1 = require("./Floaters");
const ScrollViewWithGradient_1 = require("../utils/ScrollViewWithGradient");
const react_native_1 = require("react-native");
const PrivacyPolicy_1 = require("../screens/legalRequirements/PrivacyPolicy");
const AboutUs_1 = require("../screens/legalRequirements/AboutUs");
const License_1 = require("../screens/legalRequirements/License");
const TermsAndConditions_1 = require("../screens/legalRequirements/TermsAndConditions");
const ProjectBanner_1 = require("../project/ProjectBanner");
const InternalLink_1 = require("../navigation/InternalLink");
const ProjectBackground_1 = require("../project/ProjectBackground");
const titleBoxHeight = 64;
const LoginTemplate = (props) => {
    /**
    breakpoints = {
        base: 0,
        sm: 480,
        md: 768,
        lg: 992,
        xl: 1280,
    };
     */
    const isSmallDevice = (0, native_base_1.useBreakpointValue)({
        base: true,
        md: false,
    });
    const [reloadnumber, setReloadnumber] = (0, react_1.useState)(0);
    const [serverInfo, setServerInfo] = (0, react_1.useState)(undefined);
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
        //loadServerInfo();
    }, []);
    function renderSpaceBetweenLogoAndSignIn() {
        return (<native_base_1.View style={{ height: titleBoxHeight }}></native_base_1.View>);
    }
    function renderLeftSide() {
        let padding = isSmallDevice ? 20 : 80;
        let width = isSmallDevice ? "100%" : 500;
        return (<native_base_1.Flex style={{ width: width, height: "100%" }}>
				<ScrollViewWithGradient_1.ScrollViewWithGradient style={{ flex: 1 }}>
					<native_base_1.View style={{ paddingHorizontal: padding, paddingTop: padding, height: "100%", width: "100%" }}>
						<ProjectBanner_1.ProjectBanner />
						{renderSpaceBetweenLogoAndSignIn()}
						{props.children}
					</native_base_1.View>
				</ScrollViewWithGradient_1.ScrollViewWithGradient>
				<native_base_1.Wrap direction="row" justify="center">
					<InternalLink_1.InternalLink destination={AboutUs_1.AboutUs} fontSize={"sm"}>{"About Us"}</InternalLink_1.InternalLink>
					<InternalLink_1.InternalLink destination={License_1.License} fontSize={"sm"}>{"License"}</InternalLink_1.InternalLink>
					<InternalLink_1.InternalLink destination={PrivacyPolicy_1.PrivacyPolicy} fontSize={"sm"}>{"Privacy Policy"}</InternalLink_1.InternalLink>
					<InternalLink_1.InternalLink destination={TermsAndConditions_1.TermsAndConditions} fontSize={"sm"}>{"Terms & Conditions"}</InternalLink_1.InternalLink>
				</native_base_1.Wrap>
			</native_base_1.Flex>);
    }
    function renderRightSide() {
        if (isSmallDevice) {
            return null;
        }
        return (<ProjectBackground_1.ProjectBackground />);
    }
    return (<react_native_1.SafeAreaView style={{ height: "100%", width: "100%" }}>
		<native_base_1.Flex style={{ height: "100%", width: "100%" }} direction="row">
			{renderLeftSide()}
			{renderRightSide()}
			<Floaters_1.Floaters />
		</native_base_1.Flex>
		</react_native_1.SafeAreaView>);
};
exports.LoginTemplate = LoginTemplate;
