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

export const RootStack = (props) => {

  let initialRouteName = "Check";

  const defaultSubRoute = "/#/";

  console.log("window.location.hash: "+window.location.hash);

  if(PlatformHelper.isWeb()){
    initialRouteName = window.location.hash.substr(1);
    if(initialRouteName.startsWith("/")){
      initialRouteName = initialRouteName.substr(1);
    }
  }

  let Drawer = RouteRegisterer.getDrawer();

  const navigateAndSetHash = (navigation, routeName) => {
    console.log("navigateAndSetHash: "+routeName);
    let prefix = "";
    if(PlatformHelper.isWeb()){
      prefix = prefix+"/";
      console.log("Route to: "+window.location.hash+prefix+routeName);
      window.location.hash = prefix+routeName;
    } else {
      navigation.navigate(routeName);
    }
  };

  useEffect(() => {
    if(PlatformHelper.isWeb()){
      function handleHashChange() {
        let currentRoute = window.location.hash.substr(1);
        if(currentRoute.startsWith("/")){
          currentRoute = currentRoute.substr(1);
        }
        //navigation.navigate(currentRoute);
        NavigatorHelper.navigateToRouteName(currentRoute)
      }
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
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
        <Drawer.Screen key={routeInfo.name} name={routeInfo.name} component={() => {
          return (
            <View>
              <Text>Test</Text>
              <TouchableOpacity onPress={() => navigateAndSetHash(navigation, 'Subpath')}>
                <Text>Go to Subpath</Text>
              </TouchableOpacity>
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
