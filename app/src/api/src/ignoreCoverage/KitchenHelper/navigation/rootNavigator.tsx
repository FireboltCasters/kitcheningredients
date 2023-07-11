// @ts-nocheck
import React from 'react';
import {RouteRegisterer} from "./RouteRegisterer";
import {Navigation} from "./Navigation";
import {CustomDrawerContent} from "./CustomDrawerContent";
import {ConfigHolder} from "../../KitchenHelper/ConfigHolder";
import {Layout} from "../../KitchenHelper/templates/Layout";
import {DefaultNavigation} from "./DefaultNavigation";
import {RouteHelper} from "./RouteHelper";
import {NavigationHistorySetter} from "./NavigationHistorySetter";
import {ExampleHeavyScreen} from "../../../../../project/testScreens/ExampleHeavyScreen";
import {useSynchedDrawerConfig} from "../synchedstate/SynchedState";

export const RootStack = (props) => {

  let isSmallDevice = Layout.usesSmallDevice();

  const startURL = props?.startURL || null;

  let initialRouteName = RouteHelper.getInitialRouteName(startURL);
  let search = RouteHelper.getSearchParam(startURL);

  const [initialSearch, setInitialSearch] = React.useState(search);
  const [drawerConfig, setDrawerConfig] = useSynchedDrawerConfig();

  let Drawer = RouteRegisterer.getDrawer();

  // TODO do we have this?
  // navigationOptions={{unmountInactiveRoutes: true}}

  let largeScreenDrawerType = "front";

  const hideDrawer = ConfigHolder.instance.isDrawerHidden()
  if(!hideDrawer){
    largeScreenDrawerType = "permanent";
  }

  let drawerType = isSmallDevice ? 'front' : largeScreenDrawerType /** 'front' | 'back' | 'slide' | 'permanent' */

  let drawerBorderColor = RouteRegisterer.getDrawerBorderColor();
  let drawerStyle = !!drawerBorderColor ? {borderColor: drawerBorderColor} : undefined;


  const showOnlyScreensForAnonymUser = !ConfigHolder.instance.getUser();
  let screens = showOnlyScreensForAnonymUser ? DefaultNavigation.getAnonymUserScreens(initialSearch) : DefaultNavigation.getAllScreens(initialSearch);

  let pluginRootComponent = null;
  if(!!ConfigHolder.plugin.getRootComponent){
    pluginRootComponent = ConfigHolder.plugin.getRootComponent(props);
  }

  if(!initialRouteName){
    initialRouteName = Navigation.DEFAULT_ROUTE_HOME;
  }

  console.log("Render RootStack")

  let drawerPosition = drawerConfig?.drawerPosition || 'left';

  return (
    <>
      <NavigationHistorySetter/>
      <Drawer.Navigator initialRouteName={initialRouteName}
                        drawerStyle={drawerStyle}
                        drawerType={drawerType}

                        redirectToLogin={props.redirectToLogin+""}
                        reloadNumber={ConfigHolder.instance.state.reloadNumber}
                        swipeEnabled={false}
                        drawerPosition={drawerPosition}
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                        screenOptions={{
                          headerShown: false,
                          //unmountOnBlur: true
                          // preload screens
                        }}
      >
        {screens}
        <Drawer.Screen key={"test"} name={"Test"} params={undefined} initialParams={undefined}>
          {(props) => {
            // use react memo
            let memoizedComponent = React.useMemo(() => {
              return <ExampleHeavyScreen/>
            }, []);
            return memoizedComponent
          }}
        </Drawer.Screen>
      </Drawer.Navigator>
      {pluginRootComponent}
    </>
  );
}
