// @ts-nocheck
import React, {FunctionComponent} from "react";
import {Text, View} from "native-base";

import {Icon} from "./Icon";

export interface AppState{
  icon: string,
  content: string
}
export const TextWithIcon: FunctionComponent<AppState> = (props) => {

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
