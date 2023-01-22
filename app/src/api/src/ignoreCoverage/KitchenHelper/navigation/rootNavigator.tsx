import React, {useEffect} from 'react';
import {RouteRegisterer} from "./RouteRegisterer";
import {PlatformHelper} from "../helper/PlatformHelper";
import {Navigation} from "./Navigation";
import {CustomDrawerContent} from "./CustomDrawerContent";
import {ConfigHolder} from "../../KitchenHelper/ConfigHolder";
import {Layout} from "../../KitchenHelper/templates/Layout";
import {DefaultNavigation} from "./DefaultNavigation";
import {RouteHelper} from "./RouteHelper";
import {Login} from "../auth/Login";

export const RootStack = (props) => {

  let isSmallDevice = Layout.usesSmallDevice();

  const startURL = props?.startURL || null;

  let initialRouteName = RouteHelper.getInitialRouteName(startURL);
  let search = getSearchParam(startURL);

  const [initialSearch, setInitialSearch] = React.useState(search);

  let Drawer = RouteRegisterer.getDrawer();





  function getSearchParam(startURL){
    let search = RouteHelper.getSearchParamString(startURL);
    // parse for search params in url to dict
    let searchParams = new URLSearchParams(search);
    let searchDict = {};
    for (let [key, value] of searchParams) {
      searchDict[key] = value;
    }
    return searchDict;
  }

  /**
   * We have to check if the url changed and if so, we have to navigate to the new route
   * This is a workaround for the web version of react-navigation.
   */
  async function handleHashChange(){
    let currentURL = window.location.href;
    let currentRouteName = RouteHelper.getInitialRouteName(currentURL);
    let currentSearch = getSearchParam(currentURL);
    Navigation.navigateTo(currentRouteName, currentSearch, true);
  }

  /**
   * We register a listener for the hash change event
   */
  function registerHashChangeForWeb(){
    if(PlatformHelper.isWeb()){
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }

  useEffect(() => {
    let cleanUpFunction = registerHashChangeForWeb()
    return cleanUpFunction;
  }, []);

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

  return (
    <>
      <Drawer.Navigator initialRouteName={initialRouteName}
                        drawerStyle={drawerStyle}
                        drawerType={drawerType}
                        redirectToLogin={props.redirectToLogin+""}
                        reloadNumber={ConfigHolder.instance.state.reloadNumber}
                        swipeEnabled={false}
                        drawerPosition={'left' /** | 'right' */}
                        drawerContent={(props) => <CustomDrawerContent {...props} />}
                        screenOptions={{
                          headerShown: false,
                          unmountOnBlur: true
                        }}
      >
        {screens}
      </Drawer.Navigator>
      {pluginRootComponent}
    </>
  );
}
