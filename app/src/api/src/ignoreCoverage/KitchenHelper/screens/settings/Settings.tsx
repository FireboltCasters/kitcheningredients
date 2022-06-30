// @ts-nocheck
import React, {useEffect} from "react";
import {Button, Text, View} from "native-base";
import {NavigatorHelper} from "../../navigation/NavigatorHelper";
import {DeveloperSettings} from "./DeveloperSettings";
import {keyof} from "ts-keyof";
import {TouchableOpacity} from "react-native";
import {ConfigHolder} from "../../ConfigHolder";

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
				NavigatorHelper.navigate(DeveloperSettings);
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

