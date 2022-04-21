// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {AuthProvider} from "./AuthProvider";
import {Provider} from "./Provider";
import App from "../App";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Home} from "../screens/home/Home";

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
		await App.setUserAsGuest();
		await NavigatorHelper.navigate(Home)
		await App.setHideDrawer(false);
	}

	return (
		<AuthProvider serverInfo={serverInfo} provider={provider} buttonText={"Continue in as Guest"} callback={handleOpened} />
	)
}