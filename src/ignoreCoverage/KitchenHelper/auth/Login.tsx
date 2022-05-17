// @ts-nocheck
import React, {useEffect, useState} from "react";
import {WebViewLogin} from "./WebViewLogin";
import EnviromentHelper from "../EnviromentHelper";
import ServerAPI from "../ServerAPI";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Platform} from "react-native";
import {ConfigHolder} from "../ConfigHolder";
import {keyof} from "ts-keyof";
import {RegisteredRoutesMap} from "kitcheningredients";

export const Login = (props) => {

	let hideDrawer = false;

	if(!ConfigHolder.instance.shouldHideDrawer()){
		//console.log("Login calls hide drawer");
		hideDrawer = true;
	}
	if(Platform.OS!=="web"){
		hideDrawer = false;
	}


	//console.log("Login passed drawer Check")

	const user = ConfigHolder.instance.getUser();

	const [loaded, setLoaded] = useState(false);
	const [firstload, setFirstload] = useState(true);

	const params = NavigatorHelper.getRouteParams(props);
	let directus_access_token = params[EnviromentHelper.getDirectusAccessTokenName()];

	async function fetchAccessTokenInUrl(){
		try{
			let data = await ServerAPI.loginWithAccessDirectusAccessToken(directus_access_token);
			let directus = ServerAPI.getClient();
			let me = await ServerAPI.getMe(directus);
			await ConfigHolder.instance.setUser(me);
			return true;
		} catch (err){
			console.log(err);
			console.log(Object.keys(err));
			if(err.code === 401){
				console.log("Not allowed");
			}
			console.log("Not allowed");
			NavigatorHelper.navigateWithoutParams(Login);
		}
		return false;
	}

	function rerenderWithoutParams(){
		//console.log("App has found user, so we want to route without directus token");
		// https://reactnavigation.org/docs/navigating-without-navigation-prop/#handling-initialization
		//since the navigation isn't ready at the first rendering, we need to retrigger useEffect to render it then
		if(firstload){
			setFirstload(false);
		} else {
			NavigatorHelper.navigateWithoutParams(Login);
		}
		return true;
	}

  async function handleContinue(){
    await NavigatorHelper.navigate(RegisteredRoutesMap.getHome())
    await ConfigHolder.instance.setHideDrawer(false);
  }

	async function fetchAccessToken(){
		//console.log("fetchAccessToken");
		if(!!directus_access_token){
			if(!!user){
				rerenderWithoutParams();
				return;
			} else {
				//console.log("Token in URL found");
				let successWithUrlToken = await fetchAccessTokenInUrl();
			}
		} else {
			//console.log("No access token in url, finish loading")
      if(ConfigHolder.autoLogin && !!user){
        handleContinue();
      } else {
        setLoaded(true)
      }
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		//console.log("Login useEffect")
		if(ConfigHolder.instance.shouldRedirectToLogin()){
			ConfigHolder.instance.setRedirectToLogin(false);
		}

		if(hideDrawer){
			ConfigHolder.instance.setHideDrawer(true);
		} else {
			fetchAccessToken();
		}

	}, [props.route.params, firstload])

	let finishedLoading = loaded;

	if(!!directus_access_token){
		finishedLoading = false;
	}

	if(hideDrawer){
		return null;
	}

	return <WebViewLogin loaded={finishedLoading} user={user} handleContinue={handleContinue} />;
}

Login.displayName = keyof({ Login });
