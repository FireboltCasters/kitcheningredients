// @ts-nocheck
import React, {useEffect} from 'react';
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {useBreakpointValue, useTheme, View, Text} from "native-base";
import {CustomDrawerContent} from "./CustomDrawerContent";
import {ConfigHolder} from "../ConfigHolder";
import {RouteRegisterer} from "./RouteRegisterer";
import {Layout} from "../templates/Layout";
import {RequiredSynchedStates} from "../synchedstate/RequiredSynchedStates";
import {useSynchedState} from "../synchedstate/SynchedState";
import {useSynchedJSONState} from "../synchedstate/SynchedState";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import { useNavigation } from '@react-navigation/native';
import {TouchableOpacity} from "react-native";

export const RootStack = (props) => {
  const initialRouteName = window.location.hash.substr(1);

  let Drawer = RouteRegisterer.getDrawer();

  const navigateAndSetHash = (navigation, routeName) => {
    navigation.navigate(routeName);
    window.location.hash = routeName;
  };

  useEffect(() => {
    function handleHashChange() {
        const currentRoute = window.location.hash.substr(1);
        //navigation.navigate(currentRoute);
        NavigatorHelper.navigateToRouteName(currentRoute)
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
