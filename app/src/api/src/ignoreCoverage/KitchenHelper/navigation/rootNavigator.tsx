// @ts-nocheck
import React from 'react';
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {useBreakpointValue, useTheme, View, Text} from "native-base";
import {CustomDrawerContent} from "./CustomDrawerContent";
import {ConfigHolder} from "../api/ConfigHolder";
import {RouteRegisterer} from "./RouteRegisterer";
import {Layout} from "../templates/Layout";
import {RequiredSynchedStates} from "../synchedstate/RequiredSynchedStates";
import {useSynchedState} from "../synchedstate/SynchedState";
import {useSynchedJSONState} from "../synchedstate/SynchedState";
import {NavigatorHelper} from "../navigation/NavigatorHelper";

export const RootStack = (props) => {
  const [test, setTest] = useSynchedState(RequiredSynchedStates.menuReloadNumber)
  const [navigationHistory, setNavigationHistory] = useSynchedJSONState(RequiredSynchedStates.navigationHistory)
  NavigatorHelper.setSetNavigationHistoryFunction(setNavigationHistory);

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

  RouteRegisterer.loadDrawerScreens();
	let screens = ConfigHolder.instance.shouldRedirectToLogin() ? RouteRegisterer.loginScreens : RouteRegisterer.screens;

  let pluginRootComponent = null;
  if(!!ConfigHolder.plugin.getRootComponent){
    pluginRootComponent = ConfigHolder.plugin.getRootComponent(props);
  }

	//TODO maybe add Drawer instead of custom implementation: https://reactnavigation.org/docs/5.x/drawer-navigator
	return(
		<View flex={1} flexDirection={"row"} >
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
