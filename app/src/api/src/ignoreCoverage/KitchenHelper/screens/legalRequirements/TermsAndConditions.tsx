// @ts-nocheck
import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../helper/TextGenerator";
import {ConfigHolder} from "../../ConfigHolder";
import {RouteRegisterer} from "../../navigation/RouteRegisterer";
import {RegisteredRoutesMap} from "../../navigation/RegisteredRoutesMap";
import {keyof} from "ts-keyof";
import {PrivacyPolicy} from "./PrivacyPolicy";
import {RouteHelper} from "../../navigation/RouteHelper";

export const TermsAndConditions = (props) => {

  ConfigHolder.instance.setHideDrawer(false, RouteHelper.getNameOfComponent(TermsAndConditions));

	// corresponding componentDidMount
	useEffect(() => {

	}, [props?.route?.params])

	let component = ConfigHolder.plugin.getTermsAndConditionsComponent();

	if(!!component){
		return component
	}

	return(
		<>
			<Text>{TextGenerator.generateTextLong()}</Text>
		</>
	)
}

TermsAndConditions.displayName = keyof({ TermsAndConditions });
