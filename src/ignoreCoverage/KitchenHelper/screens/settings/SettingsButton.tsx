// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {Button, Text} from "native-base";
import {NavigatorHelper} from "../../navigation/NavigatorHelper";
import {Settings} from "./Settings";
import {TransparentTextButton} from "../../buttons/TransparentTextButton";
import {Icon} from "../../components/Icon";

export interface AppState {
	onlyIcon?: boolean;
	transparent?: boolean;
}
export const SettingsButton: (props) => any[] = (props) => {

	function handleOpen(){
		NavigatorHelper.navigate(Settings);
	}

	function renderOnlyIcon(){
		return (
			<Button key={"SettingsIcon"} style={{backgroundColor: "transparent"}} onPress={handleOpen} >
				<Icon name={"cog"}/>
			</Button>
		)
	}

	function renderLogoutText(){
		return(
			<TransparentTextButton key={"logoutTextButton"} onPress={handleOpen}>
				<Text>{"Settings"}</Text>
			</TransparentTextButton>
		)
	}

	let content = [];

	if(props.onlyIcon){
		content.push(renderOnlyIcon());
	} else {
		content.push(renderLogoutText());
	}

	return content
}
