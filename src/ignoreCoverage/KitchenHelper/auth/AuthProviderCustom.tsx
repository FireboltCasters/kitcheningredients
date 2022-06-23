// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {AuthProvider} from "./AuthProvider";
import {Provider} from "./Provider";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Home} from "../screens/home/Home";
import {ConfigHolder} from "../ConfigHolder";

interface AppState {
	serverInfo: any;
	loading?: boolean,
  buttonText: string,
  name: string,
  icon: any,
  onPress: any,
}

export const AuthProviderCustom: FunctionComponent<AppState> = ({serverInfo}) => {

	let provider: Provider = {
		name: props.name,
		icon: props.icon
	};

	return (
		<AuthProvider serverInfo={serverInfo} provider={provider} buttonText={"Continue as Guest"} callback={props.onPress} />
	)
}
