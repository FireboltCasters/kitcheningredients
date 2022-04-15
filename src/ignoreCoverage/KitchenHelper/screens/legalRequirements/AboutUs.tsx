// @ts-nocheck
import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../helper/TextGenerator";
import App from "../../App";

export const AboutUs = (props) => {

	App.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {
		//console.log("About Us useEffect");
	}, [props.route.params])

	let component = App.plugin.getAboutUsComponent();

	if(!!component){
		return component
	}

	return(
		<>
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}