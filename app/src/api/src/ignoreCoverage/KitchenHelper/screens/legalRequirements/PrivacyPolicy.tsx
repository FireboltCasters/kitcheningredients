// @ts-nocheck
import React, {useEffect} from "react";
import {Text, View} from "native-base";
import {ConfigHolder} from "../../api/ConfigHolder";

import {RenderHTML} from "../../utils/RenderHTML";
import TextGenerator from "../../helper/TextGenerator";
import {License} from "./License";
import {keyof} from "ts-keyof";

export const PrivacyPolicy = (props) => {

	ConfigHolder.instance.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props?.route?.params])

	let component = ConfigHolder.plugin.getPrivacyPolicyComponent();

	if(!!component){
		return component
	}

	return(
			<View>
				<Text>{TextGenerator.getVeryLongText()}</Text>
			</View>
	)
}

PrivacyPolicy.displayName = keyof({ PrivacyPolicy });
