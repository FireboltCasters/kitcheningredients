// @ts-nocheck
import React from "react";
import {Text, View} from "native-base";

import {Icon} from "./Icon";

export const TextWithIcon = (props) => {

	function renderRowInformation(icon, content){
		let renderedIcon = !!icon ? <Text><Icon  name={icon} marginRight={15}/></Text> : null;

		return (
			<View style={{alignItems: "center", flexDirection: "row", margin: 3}}>
				{renderedIcon}<Text>{content}</Text>
			</View>
		)
	}

	return (renderRowInformation(props.icon, props.children))
}
