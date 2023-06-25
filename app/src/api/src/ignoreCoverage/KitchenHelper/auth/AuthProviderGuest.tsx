// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {AuthProvider} from "./AuthProvider";
import {Provider} from "./Provider";
import {ConfigHolder} from "../ConfigHolder";
import {Navigation} from "./../navigation/Navigation";
import {TranslationKeys} from "../translations/TranslationKeys";

interface AppState {
	serverInfo: any;
	loading?: boolean,
}

export const AuthProviderGuest: FunctionComponent<AppState> = ({serverInfo}) => {

	let provider: Provider = {
		name: "Guest",
		icon: "incognito-circle"
	};

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const translation_continue_as_guest = useTranslation(TranslationKeys.continue_as_guest);

	async function handleOpened(){
		await ConfigHolder.instance.setUserAsGuest();
		await ConfigHolder.instance.setHideDrawer(false, Navigation.DEFAULT_ROUTE_HOME);
	}

	return (
		<AuthProvider serverInfo={serverInfo} provider={provider} buttonText={translation_continue_as_guest} callback={handleOpened} />
	)
}
