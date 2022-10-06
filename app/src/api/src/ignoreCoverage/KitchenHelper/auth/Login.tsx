// @ts-nocheck
import React, {useEffect, useState} from "react";
import {WebViewLogin} from "./WebViewLogin";
import EnviromentHelper from "../EnviromentHelper";
import ServerAPI from "../ServerAPI";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Platform} from "react-native";
import {ConfigHolder} from "../ConfigHolder";
import {keyof} from "ts-keyof";
import {RegisteredRoutesMap} from "./../navigation/RegisteredRoutesMap";

let lastAccessToken = null;

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

	const params = NavigatorHelper.getRouteParams(props);
	let directus_access_token = params[EnviromentHelper.getDirectusAccessTokenName()];

	async function fetchAccessTokenInUrl(){
	  console.log("Login: fetchAccessTokenInUrl");
		try{
			let data = await ServerAPI.loginWithAccessDirectusAccessToken(directus_access_token);
			let directus = ServerAPI.getClient();
			console.log("Login: getMe");
			let me = await ServerAPI.getMe(directus);
			console.log("Login: getMe done");
			console.log("Login: set user");
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

  async function handleContinue(){
    await NavigatorHelper.navigate(RegisteredRoutesMap.getHome())
    await ConfigHolder.instance.setHideDrawer(false);
  }

	async function fetchAccessToken(){
		//console.log("fetchAccessToken");
		if(!!directus_access_token){
		  if(lastAccessToken === directus_access_token){
		    console.log("Login: fetchAccessToken: same token");
        return;
      } else {
        lastAccessToken = directus_access_token;
		    console.log("Login: fetchAccessToken: new token");
		   if(!user){
		     console.log("Login: fetchAccessToken: no user");
         let successWithUrlToken = await fetchAccessTokenInUrl();
       }
      }
		} else {
			//console.log("No access token in url, finish loading")
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(ConfigHolder.instance.shouldRedirectToLogin()){
			ConfigHolder.instance.setRedirectToLogin(false);
			return;
		}

		if(hideDrawer){
			ConfigHolder.instance.setHideDrawer(true);
			return;
		} else {
		  fetchAccessToken();
			return;
		}

	}, [props?.route?.params])

	if(hideDrawer){
		return null;
	}

  if(!!user){
    handleContinue();
    return null;
  }

  let finishedLoading = true;
  if(!!directus_access_token){
    finishedLoading = false;
  }

	return <WebViewLogin loaded={finishedLoading} user={user} handleContinue={handleContinue} />;
}

Login.displayName = keyof({ Login });
