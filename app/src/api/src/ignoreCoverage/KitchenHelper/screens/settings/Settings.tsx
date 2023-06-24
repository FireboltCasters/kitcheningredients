// @ts-nocheck
import React, {useEffect} from "react";
import {View} from "native-base";
import {keyof} from "ts-keyof";
import {ConfigHolder} from "../../ConfigHolder";
import {LegalRequiredLinks} from "../legalRequirements/LegalRequiredLinks";
import {SignOutButton} from "../../auth/SignOutButton";

export const Settings = (props) => {

  let customComponent = ConfigHolder.plugin.getSettingsComponent();
  if(!!customComponent){
    return customComponent;
  }

	// corresponding componentDidMount
	useEffect(() => {

	}, [props?.route?.params])

	return(
		<View style={{width: "100%"}}>
      <View style={{flex: 1, flexDirection: "row-reverse"}}>
        <SignOutButton onlyIcon={true} />
      </View>
      <View style={{
        flex: 1,
        width: '100%',
        alignItems: "center", justifyContent: "center",
        flexDirection: 'row',
        flexWrap: 'wrap', // Enable wrapping of items
      }}>
        <LegalRequiredLinks />
      </View>
		</View>
	)
}

Settings.displayName = keyof({ Settings });

