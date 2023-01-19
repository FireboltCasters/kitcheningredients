import React, {useEffect} from 'react';
import {Text, View} from "native-base";
import {RouteRegisterer} from "./RouteRegisterer";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {useNavigation, useRoute} from '@react-navigation/native';
import {Linking, TouchableOpacity} from "react-native";
import {PlatformHelper} from "../helper/PlatformHelper";
import {Navigation} from "./Navigation";
import {Route} from "./Navigation";
import {ExampleParamScreen} from "../../../../../project/testScreens/ExampleParamScreen";

export const RootStack = (props) => {

  let firstRender = true;
  const initialURL = props?.initialURL || null;
  console.log("######## ROOT STACK ########");
  console.log("initialURL", initialURL);

  const prefix = Navigation.ROUTE_PATH_PREFIX;
  const FRAGMENT = "#";

  let initialRouteName = getInitialRouteName(initialURL);
  console.log("initialRouteName", initialRouteName);
  let search = getSearchParam(initialURL);

  const [initialSearch, setInitialSearch] = React.useState(search);
  console.log("search", search);

  let Drawer = RouteRegisterer.getDrawer();

  function getHashRouteWithSearchParams(initialURL){
    let hash = initialURL?.split("#")[1] || "";
    if(hash.startsWith(prefix)){
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
    return routeName;
  }

  /**
   * We have to check if the url changed and if so, we have to navigate to the new route
   * This is a workaround for the web version of react-navigation.
   */
  async function handleHashChange(){
    console.log("handleHashChange: ");
    let currentRouteName = getInitialRouteName(window.location.href);
    let currentSearch = getSearchParam(window.location.href);
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
    //Navigation.navigateTo(initialRouteName, initialSearch);
  }, []);

  let renderedScreens = [];
  let registeredRoutes = Navigation.routeGetRegistered();
  for(let routeKey in registeredRoutes){
    let routeInfo: Route = registeredRoutes[routeKey];
    if(routeInfo?.component){
      let component = (screenProps) => {
        return (
          <View>
            {routeInfo?.component(screenProps)}
          </View>
        )
      }

      renderedScreens.push(
        <Drawer.Screen key={routeInfo?.name} name={routeInfo?.name} params={routeInfo?.params} initialParams={initialSearch} >
          {component}
        </Drawer.Screen>
      );
    }
  }



  return (
    <>
      <Drawer.Navigator initialRouteName={initialRouteName}>
        {renderedScreens}
        <Drawer.Screen name="Subpath">
            {() => {
              return (
                <View>
                  <Text>Subpath</Text>
                  <TouchableOpacity onPress={() => Navigation.navigateTo('ExampleParamScreen', {testParam: 10})}>
                    <Text>Go to ExampleParamScreen</Text>
                  </TouchableOpacity>
                </View>
              )
            }}
        </Drawer.Screen>
      </Drawer.Navigator>
    </>
  );
}
