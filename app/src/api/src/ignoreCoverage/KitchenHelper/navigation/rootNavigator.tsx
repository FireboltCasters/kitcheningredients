// @ts-nocheck
import React from 'react';
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {useBreakpointValue, useTheme, View} from "native-base";
import {CustomDrawerContent} from "./CustomDrawerContent";
import {ConfigHolder} from "../ConfigHolder";
import {RouteRegisterer} from "./RouteRegisterer";
import {Layout} from "../templates/Layout";

export const RootStack = (props) => {

	let isSmallDevice = Layout.usesSmallDevice();

	const theme = useTheme();

	// TODO do we have this?
	// navigationOptions={{unmountInactiveRoutes: true}}

	let largeScreenDrawerType = "front";

	const hideDrawer = ConfigHolder.instance.shouldHideDrawer()
	if(!hideDrawer){
		largeScreenDrawerType = "permanent";
	}

	let drawerType = isSmallDevice ? 'front' : largeScreenDrawerType /** 'front' | 'back' | 'slide' | 'permanent' */

	let drawerBorderColor = RouteRegisterer.getDrawerBorderColor();
	let drawerStyle = !!drawerBorderColor ? {borderColor: drawerBorderColor} : undefined;

	let Drawer = RouteRegisterer.getDrawer();

	let screens = ConfigHolder.instance.shouldRedirectToLogin() ? RouteRegisterer.loginScreens : RouteRegisterer.screens;

  let pluginRootComponent = null;
  if(!!ConfigHolder.plugin.getRootComponent){
    pluginRootComponent = ConfigHolder.plugin.getRootComponent();
  }

	//TODO maybe add Drawer instead of custom implementation: https://reactnavigation.org/docs/5.x/drawer-navigator
	return(
		<View flex={1} flexDirection={"row"}>
			<View flex={1}>
					<Drawer.Navigator
						drawerStyle={drawerStyle}
						drawerType={drawerType}
						redirectToLogin={props.redirectToLogin+""}
						reloadNumber={ConfigHolder.instance.state.reloadNumber}
						swipeEnabled={false}
						drawerPosition={'left' /** | 'right' */}
						drawerContent={(props) => <CustomDrawerContent {...props} />}
						initialRouteName={RegisteredRoutesMap.getInitialRouteName()}

						screenOptions={{
							headerShown: false,
							unmountOnBlur:true
						}}>
						{screens}
					</Drawer.Navigator>
          {pluginRootComponent}
			</View>
		</View>
	)
}
/**

*/
