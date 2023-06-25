import React, {FunctionComponent} from "react";
import {Tooltip} from "native-base";
import {TouchableOpacity} from "react-native";

export interface AppState{
	disabled?: boolean,
	accessibilityLabel: string,
	accessibilityRole?: string,
	style?: any
}
export const MyTouchableOpacity: FunctionComponent<AppState> = ({disabled, accessibilityRole, accessibilityLabel, style ,...props}) => {

	let mergedStyle = []
	if(Array.isArray(style)){
		mergedStyle = style
	} else {
		mergedStyle.push(style)
	}
	if(disabled){
		mergedStyle.push({
			cursor: "not-allowed",
			opacity: 0.5
		});
	}



  return(
		<Tooltip label={accessibilityLabel} >
      {/* @ts-ignore */}
			<TouchableOpacity accessibilityRole={accessibilityRole ?? 'button'} accessibilityLabel={accessibilityLabel} disabled={disabled} style={mergedStyle} {...props}>
				{props?.children}
			</TouchableOpacity>
		</Tooltip>
	)

}
