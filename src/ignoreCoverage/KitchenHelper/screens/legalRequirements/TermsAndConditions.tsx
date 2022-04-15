// @ts-nocheck
import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../helper/TextGenerator";
import App from "../../App";

export const TermsAndConditions = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

	let component = App.plugin.getTermsAndConditionsComponent();

	if(!!component){
		return component
	}

	return(
		<>
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}