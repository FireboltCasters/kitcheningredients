"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStack = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const RegisteredRoutesMap_1 = require("./RegisteredRoutesMap");
const native_base_1 = require("native-base");
const CustomDrawerContent_1 = require("./CustomDrawerContent");
const App_1 = __importDefault(require("../App"));
const RouteRegisterer_1 = require("./RouteRegisterer");
const BreakPointValues_1 = __importDefault(require("../templates/BreakPointValues"));
const RootStack = (props) => {
    let isSmallDevice = BreakPointValues_1.default.usesSmallDevice();
    const theme = (0, native_base_1.useTheme)();
    // TODO do we have this?
    // navigationOptions={{unmountInactiveRoutes: true}}
    let largeScreenDrawerType = "front";
    const hideDrawer = App_1.default.shouldHideDrawer();
    if (!hideDrawer) {
        largeScreenDrawerType = "permanent";
        //TODO need to hide on login screen
    }
    let drawerType = isSmallDevice ? 'front' : largeScreenDrawerType; /** 'front' | 'back' | 'slide' | 'permanent' */
    let drawerStyleWidth = isSmallDevice ? "100%" : theme.sidebarWidth;
    let drawerBorderColor = RouteRegisterer_1.RouteRegisterer.getDrawerBorderColor();
    let drawerStyle = !!drawerBorderColor ? { borderColor: drawerBorderColor } : undefined;
    let Drawer = RouteRegisterer_1.RouteRegisterer.getDrawer();
    let screens = App_1.default.shouldRedirectToLogin() ? RouteRegisterer_1.RouteRegisterer.loginScreens : RouteRegisterer_1.RouteRegisterer.screens;
    //TODO maybe add Drawer instead of custom implementation: https://reactnavigation.org/docs/5.x/drawer-navigator
    return (<native_base_1.View flex={1} flexDirection={"row"}>
			<native_base_1.View flex={1}>
					<Drawer.Navigator drawerStyle={drawerStyle} drawerType={drawerType} redirectToLogin={props.redirectToLogin + ""} reloadNumber={App_1.default.instance.state.reloadNumber} swipeEnabled={false} drawerPosition={'left' /** | 'right' */} drawerContent={(props) => <CustomDrawerContent_1.CustomDrawerContent {...props}/>} initialRouteName={RegisteredRoutesMap_1.RegisteredRoutesMap.getInitialRouteName()} screenOptions={{
            headerShown: false,
            unmountOnBlur: true
        }}>
						{screens}
					</Drawer.Navigator>
			</native_base_1.View>
		</native_base_1.View>);
};
exports.RootStack = RootStack;
/**

*/
