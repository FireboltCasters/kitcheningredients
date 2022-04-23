// @ts-nocheck
import React, {useEffect} from "react";
import {Button, Text, View} from "native-base";
import {NavigatorHelper} from "../../navigation/NavigatorHelper";
import {DeveloperSettings} from "./DeveloperSettings";
import {ConfigHolder} from "../../ConfigHolder";

export const Settings = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

  let component = ConfigHolder.plugin.getSettingsComponent();

  if(!!component){
    return component
  }

	function renderOpenDeveloperSettings(){
		return(
			<Button onPress={() => {
				NavigatorHelper.navigate(DeveloperSettings);
			}}
			><Text>{"Developer Settings"}</Text></Button>
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
