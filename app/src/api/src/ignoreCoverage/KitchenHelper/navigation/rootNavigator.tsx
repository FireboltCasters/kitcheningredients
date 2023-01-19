// @ts-nocheck
import React, {useEffect} from 'react';
import {Text, View} from "native-base";
import {RouteRegisterer} from "./RouteRegisterer";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from "react-native";
import {PlatformHelper} from "../helper/PlatformHelper";
import {Navigation} from "./Navigation";
import {Route} from "./Navigation";
import queryString from 'query-string'

export const RootStack = (props) => {

  let initialRouteName = "Check";

  const prefix = Navigation.ROUTE_PATH_PREFIX;

  console.log("window.location.hash: "+window.location.hash);

  if(PlatformHelper.isWeb()){
    initialRouteName = window.location.hash.substr(1);
    if(initialRouteName.startsWith(prefix)){
      initialRouteName = initialRouteName.substr(1);
    }
  }

  initialRouteName = undefined;

  let Drawer = RouteRegisterer.getDrawer();

  const navigateAndSetHash = (navigation, routeName) => {
    console.log("navigateAndSetHash: "+routeName);
    if(PlatformHelper.isWeb()){
      console.log("Route to: "+window.location.hash+prefix+routeName);
      window.location.hash = prefix+routeName;
    } else {
      navigation.navigate(routeName);
    }
  };

  /**
   * We have to check if the url changed and if so, we have to navigate to the new route
   * This is a workaround for the web version of react-navigation.
   */
  function handleHashChange(){
    console.log("handleHashChange: ");
    let currentRoute = window.location.hash.substr(1);
    let currentRouteName = currentRoute.split("?")[0];
    let query = queryString.parse(currentRoute)
    if(currentRouteName.startsWith(prefix)){
      currentRouteName = currentRouteName.substr(1);
    }
    //navigation.navigate(currentRoute);
    console.log("currentRouteName: "+currentRouteName);
    console.log("query: "+JSON.stringify(query, null, 2));

    NavigatorHelper.navigateToRouteName(currentRouteName, query);
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

  let renderedScreens = [];
  let registeredRoutes = Navigation.routeGetRegistered();
  console.log("Registered Routes")
  console.log(registeredRoutes)
  for(let routeKey in registeredRoutes){
    let routeInfo: Route = registeredRoutes[routeKey];
    console.log("Route: "+routeKey);
    console.log(routeInfo);
    if(routeInfo?.component){
      renderedScreens.push(
        <Drawer.Screen key={routeInfo?.name} name={routeInfo?.name} params={routeInfo?.params} component={(screenProps) => {
          return (
            <View>
              {routeInfo?.component(screenProps)}
            </View>
          )
        }}/>
      );
    }
  }

  return (
    <>
      <Drawer.Navigator initialRouteName={initialRouteName}>
        {renderedScreens}
        <Drawer.Screen name="Check" component={() => {
          const navigation = useNavigation();
          return (
            <View>
              <Text>Check</Text>
              <TouchableOpacity onPress={() => navigateAndSetHash(navigation, 'Subpath')}>
                <Text>Go to Subpath</Text>
              </TouchableOpacity>
            </View>
          )
        }}/>
        <Drawer.Screen name="Subpath" component={() => {
          const navigation = useNavigation();
          return (
            <View>
              <Text>Subpath</Text>
              <TouchableOpacity onPress={() => navigateAndSetHash(navigation, 'Check')}>
                <Text>Go to Check</Text>
              </TouchableOpacity>
            </View>
          )
        }}/>
      </Drawer.Navigator>
    </>
  );
}
