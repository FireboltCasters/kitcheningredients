// @ts-nocheck
import React, {useEffect} from 'react';
import {Text, View} from "native-base";
import {RouteRegisterer} from "./RouteRegisterer";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from "react-native";
import {PlatformHelper} from "kitcheningredients";

export const RootStack = (props) => {

  let initialRouteName = "Check";

  if(PlatformHelper.isWeb()){
    initialRouteName = window.location.hash.substr(1);
  }

  let Drawer = RouteRegisterer.getDrawer();

  const navigateAndSetHash = (navigation, routeName) => {
    navigation.navigate(routeName);
    if(PlatformHelper.isWeb()){
      window.location.hash = routeName;
    }
  };

  useEffect(() => {
    if(PlatformHelper.isWeb()){
      function handleHashChange() {
        const currentRoute = window.location.hash.substr(1);
        //navigation.navigate(currentRoute);
        NavigatorHelper.navigateToRouteName(currentRoute)
      }
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, []);

  return (
    <>
      <Drawer.Navigator initialRouteName={initialRouteName}>

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
