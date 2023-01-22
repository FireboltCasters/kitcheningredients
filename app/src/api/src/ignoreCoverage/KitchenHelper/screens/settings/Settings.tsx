// @ts-nocheck
import React, {useEffect} from "react";
import {Text, View} from "native-base";
import {DeveloperSettings} from "./DeveloperSettings";
import {keyof} from "ts-keyof";
import {TouchableOpacity} from "react-native";
import {ConfigHolder} from "../../ConfigHolder";
import {Navigation} from "../../navigation/Navigation";

export const Settings = (props) => {

  let customComponent = ConfigHolder.plugin.getSettingsComponent();
  if(!!customComponent){
    return customComponent;
  }

	// corresponding componentDidMount
	useEffect(() => {

	}, [props?.route?.params])

	function renderOpenDeveloperSettings(){
		return(
			<TouchableOpacity onPress={() => {
				Navigation.navigateTo(DeveloperSettings)
			}}
			><Text>{"Developer Settings"}</Text></TouchableOpacity>
		)
	}

	return(
		<>
			<View>
				{renderOpenDeveloperSettings()}
			</View>
		</>
	)
}

Settings.displayName = keyof({ Settings });

