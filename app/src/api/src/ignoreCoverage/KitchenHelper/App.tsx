// @ts-nocheck
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Root} from './navigation/RootComponent';
import ColorCodeHelper from "./theme/ColorCodeHelper";
import BaseThemeGenerator from "./theme";
import {RootStack} from "./navigation/rootNavigator";
import {ColorStatusBar} from "./components/ColorStatusBar";
import ServerAPI from "./ServerAPI";
import {Linking} from "react-native";
import * as ExpoLinking from "expo-linking";
import {URL_Helper} from "./helper/URL_Helper";
import UserHelper from "./utils/UserHelper";
import {StoreProvider} from "easy-peasy";
import {SynchedState} from "./synchedstate/SynchedState";
import {ConfigHolder} from "./ConfigHolder";
import {RequiredStorageKeys} from "./storage/RequiredStorageKeys";
import {ViewWithBackgroundColor} from "./templates/ViewWithBackgroundColor";
import {DefaultNavigation} from "./navigation/DefaultNavigation";
import {Navigation} from "./navigation/Navigation";
import EnviromentHelper from "./EnviromentHelper";
import {UserInitLoader} from "./utils/UserInitLoader";
import {DefaultStorage} from "./storage/DefaultStorage";
import {MyDirectusStorage} from "./storage/MyDirectusStorage";
import {MyDirectusStorageInterface} from "./storage/MyDirectusStorageInterface";
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from "./screens/test/testHome";
import ProfileScreen from "./screens/test/testProfileScreen";
import SettingsScreen from "./screens/test/testSettingsScreen";
import {NavigationContainer} from "@react-navigation/native";

const Drawer = createDrawerNavigator();

export default class App extends React.Component<any, any>{
  storage: MyDirectusStorageInterface;

	constructor(props) {
		super(props);

		this.storage = new DefaultStorage(new MyDirectusStorage());

		if(!props?.ignoreInstance){
      ConfigHolder.instance = this;
    }

	}

	render() {
    return(
      <NavigationContainer>
        <Drawer.Navigator
          drawerType={"permanent"}
          initialRouteName="Home">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    )
	}
}
