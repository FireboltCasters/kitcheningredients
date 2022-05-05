// @ts-nocheck
import React, {useEffect} from "react";
import {Text} from "native-base";
import TextGenerator from "../../helper/TextGenerator";
import {ConfigHolder} from "../../ConfigHolder";
import {Home} from "../home/Home";
import {keyof} from "ts-keyof";

export const AboutUs = (props) => {

	ConfigHolder.instance.setHideDrawer(false);

	// corresponding componentDidMount
	useEffect(() => {
		//console.log("About Us useEffect");
	}, [props.route.params])

	let component = ConfigHolder.plugin.getAboutUsComponent();

	if(!!component){
		return component
	}

	return(
		<>
			<Text>{TextGenerator.getVeryLongText()}</Text>
		</>
	)
}

AboutUs.displayName = keyof({ AboutUs });
