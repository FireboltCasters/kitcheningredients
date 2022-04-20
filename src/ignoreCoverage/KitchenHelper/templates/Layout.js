"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
// @ts-nocheck
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const native_base_1 = require("native-base");
const Floaters_1 = require("./Floaters");
const SafeAreaTop_1 = require("./SafeAreaTop");
const vector_icons_1 = require("@expo/vector-icons");
const NavigatorHelper_1 = require("../navigation/NavigatorHelper");
const ServerAPI_1 = __importDefault(require("../ServerAPI"));
const ServerInfoHelper_1 = require("../helper/ServerInfoHelper");
const App_1 = __importDefault(require("../App"));
const padding = 0;
const Layout = ({ children, navigation, title, doclink, navigateTo, _status, _hStack, ...props }) => {
    let isSmallDevice = (0, native_base_1.useBreakpointValue)({
        base: true,
        md: false,
    });
    const boxWidth = (0, native_base_1.useBreakpointValue)({
        "base": '100%',
        "md": 768 - padding + 'px',
        "lg": 992 - padding + 'px',
        "xl": 1536 - padding + 'px',
    });
    /**
     'lg': 992+320,
     'xl': 1280+320, // +280 from MenuWidth
     '2xl': 1536+320,
     */
    const { colorMode, toggleColorMode } = (0, native_base_1.useColorMode)();
    const serverInfo = props.serverInfo || ServerAPI_1.default.tempStore.serverInfo;
    let ssoIconStyle = {};
    if (!!serverInfo) {
        ssoIconStyle = ServerInfoHelper_1.ServerInfoHelper.getSsoIconStyle(serverInfo);
    }
    function renderHeading() {
        let defaultColor = ssoIconStyle.color || (colorMode == 'dark' ? 'white' : 'gray.800');
        let color = !!props.headingTextColor ? props.headingTextColor : defaultColor;
        let burgerButton = (<native_base_1.Button style={{ backgroundColor: "transparent" }} onPress={NavigatorHelper_1.NavigatorHelper.toggleDrawer}>
				<native_base_1.Icon as={vector_icons_1.MaterialCommunityIcons} name={"menu"} color={color}/>
			</native_base_1.Button>);
        if (!isSmallDevice) {
            burgerButton = null;
        }
        return (<native_base_1.Heading color={color} 
        // fontSize={{
        // 	lg: '3xl',
        // }}
        _web={{ py: 2 }} isTruncated>
				{burgerButton}
				{title ? title : App_1.default.config.title}
			</native_base_1.Heading>);
    }
    let headingBackgroundColor = props.headingBackgroundColor;
    if (!headingBackgroundColor) {
        headingBackgroundColor = ssoIconStyle.background || "transparent";
    }
    let backgroundStyle = !props.headingBackgroundStyle ? { backgroundColor: headingBackgroundColor } : undefined;
    return (<>
			<SafeAreaTop_1.SafeAreaTop {..._status}/>
			<native_base_1.Box style={{ paddingHorizontal: padding, margin: 0 }} {...props} flex={1} px={4} mx="auto" pt={navigation ? '70px' : 0} width={"100%"}>
				<native_base_1.HStack left={0} top={0} right={0} px={4} zIndex={-1} {..._hStack} style={backgroundStyle}>
					<native_base_1.HStack py={2} 
    // alignItems="flex-end"
    alignItems="center" w="100%">

						{/* <HStack alignItems="center" justifyContent="center"> */}
						{/* <ChevronLeftIcon /> */}
						{renderHeading()}
						{/* </HStack> */}
						{/* <Text color={colorMode == 'dark' ? 'white' : 'gray.800'}>v3</Text> */}
					</native_base_1.HStack>
				</native_base_1.HStack>
				<native_base_1.View style={{ width: "100%", flex: 1, alignItems: "center" }}>
					{children}
				</native_base_1.View>
			</native_base_1.Box>
			<Floaters_1.Floaters />
		</>);
    // { base: '100%', lg: '768px', xl: '1080px' }
};
exports.Layout = Layout;
