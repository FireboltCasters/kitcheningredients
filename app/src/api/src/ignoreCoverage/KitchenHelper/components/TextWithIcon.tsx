// @ts-nocheck
import React, {FunctionComponent} from "react";
import {Text, View} from "native-base";

import {Icon} from "./Icon";

export interface AppState{
  icon: any,
  content: string
}
export const TextWithIcon: FunctionComponent<AppState> = (props) => {

	function renderRowInformation(icon, content){

	  let renderedIcon = null;

	  if(!!icon){
      const isIconString = typeof icon === "string";
      if(isIconString){
        renderedIcon = <Text><Icon name={icon} /></Text>
      } else {
        renderedIcon = {icon}
      }
    }
	  
    let renderedIcon = !!renderedIcon ? <View style={{marginRight: 15}}>{renderedIcon}</View> : null;

		return (
			<View style={{alignItems: "center", flexDirection: "row", margin: 3}}>
				{renderedIcon}<Text>{content}</Text>
			</View>
		)
	}

	return (renderRowInformation(props.icon, props.children))
}
