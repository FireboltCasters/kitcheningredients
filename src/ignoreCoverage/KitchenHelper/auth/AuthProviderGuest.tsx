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
}

export const AuthProviderGuest: FunctionComponent<AppState> = ({serverInfo}) => {

	let provider: Provider = {
		name: "Guest",
		icon: "incognito-circle"
	};

	async function handleOpened(){
		await ConfigHolder.instance.setUserAsGuest();
		await NavigatorHelper.navigate(Home)
		await ConfigHolder.instance.setHideDrawer(false);
	}

	return (
		<AuthProvider serverInfo={serverInfo} provider={provider} buttonText={"Continue in as Guest"} callback={handleOpened} />
	)
}
