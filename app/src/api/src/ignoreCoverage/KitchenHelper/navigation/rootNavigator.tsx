import React, {useEffect} from 'react';
import {Text, View} from "native-base";
import {RouteRegisterer} from "./RouteRegisterer";
import {TouchableOpacity} from "react-native";
import {PlatformHelper} from "../helper/PlatformHelper";
import {Navigation, Route} from "./Navigation";
import {ExampleParamScreen} from "../../../../../project/testScreens/ExampleParamScreen";
import {CustomDrawerContent} from "./CustomDrawerContent";
import {ConfigHolder} from "../../KitchenHelper/ConfigHolder";
import {Layout} from "../../KitchenHelper/templates/Layout";

export const RootStack = (props) => {

  let isSmallDevice = Layout.usesSmallDevice();

  const initialURL = props?.initialURL || null;
  console.log("######## ROOT STACK ########");
  console.log("initialURL", initialURL);

  const PREFIX = Navigation.ROUTE_PATH_PREFIX;

  let initialRouteName = getInitialRouteName(initialURL);
  console.log("initialRouteName", initialRouteName);
  let search = getSearchParam(initialURL);

  const [initialSearch, setInitialSearch] = React.useState(search);
  console.log("search", search);

  let Drawer = RouteRegisterer.getDrawer();

  function getHashRouteWithSearchParams(initialURL){
    let hash = initialURL?.split("#")[1] || "";
    if(hash.startsWith(PREFIX)){
      hash = hash.substr(1);
    }
    return hash;
  }

  function getSearchParamString(initialURL){
    let search = initialURL?.split("?")[1] || "";
    // parse for search params in url to dict
    return search;
  }

  function getSearchParam(initialURL){
    let search = getSearchParamString(initialURL);
    // parse for search params in url to dict
    let searchParams = new URLSearchParams(search);
    let searchDict = {};
    for (let [key, value] of searchParams) {
      searchDict[key] = value;
    }
    return searchDict;
  }

  function getInitialRouteName(initialURL: string){
    // initialURL = "https://kitchenhelper.app/#/app/recipes";
    // get everything after the # and the prefix
    let hash = getHashRouteWithSearchParams(initialURL);
    let search = getSearchParamString(initialURL);
    let routeName = hash.replace("?"+search, "");
    if(!routeName || routeName === ""){
      routeName = "Home";
    }

    return routeName;
  }

  /**
   * We have to check if the url changed and if so, we have to navigate to the new route
   * This is a workaround for the web version of react-navigation.
   */
  async function handleHashChange(){
    console.log("handleHashChange: ");
    let currentURL = window.location.href;
    let currentRouteName = getInitialRouteName(currentURL);
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
    registerHashChangeForWeb()
  }, []);

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

  let renderedScreens = [];
  let registeredRoutes = Navigation.routeGetRegistered();
  for(let routeKey in registeredRoutes){
    let routeInfo: Route = registeredRoutes[routeKey];
    if(routeInfo?.component){
      renderedScreens.push(
        <Drawer.Screen key={routeInfo?.name} name={routeInfo?.name} params={routeInfo?.params} initialParams={initialSearch} component={(screenProps) => {
          return (
            <View>
              {routeInfo?.component(screenProps)}
            </View>
          )
        }}/>
      );
    }
  }

  RouteRegisterer.loadDrawerScreens();
  let screens = ConfigHolder.instance.shouldRedirectToLogin() ? RouteRegisterer.loginScreens : renderedScreens;


  let pluginRootComponent = null;
  if(!!ConfigHolder.plugin.getRootComponent){
    pluginRootComponent = ConfigHolder.plugin.getRootComponent(props);
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
                          unmountOnBlur:true
                        }}
      >
        <Drawer.Screen name="Home" component={() => {
          return (
            <View>
              <Text>Home</Text>
              <TouchableOpacity onPress={() => Navigation.navigateTo('Subpath')}>
                <Text>Go to Subpath</Text>
              </TouchableOpacity>
            </View>
          )
        }}/>
        {renderedScreens}
        <Drawer.Screen name="Subpath" component={() => {
          return (
            <View>
              <Text>Subpath</Text>
              <TouchableOpacity onPress={() => Navigation.navigateTo('ExampleParamScreen', {testParam: 10})}>
                <Text>Go to ExampleParamScreen</Text>
              </TouchableOpacity>
            </View>
          )
        }}/>
      </Drawer.Navigator>
      {pluginRootComponent}
    </>
  );
}
