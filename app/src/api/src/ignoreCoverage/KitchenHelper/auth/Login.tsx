// @ts-nocheck
import React, {useEffect, useState} from "react";
import {WebViewLogin} from "./WebViewLogin";
import EnviromentHelper from "../EnviromentHelper";
import ServerAPI from "../ServerAPI";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Platform} from "react-native";
import {ConfigHolder} from "../ConfigHolder";
import {keyof} from "ts-keyof";
import {Navigation} from "./../navigation/Navigation";
import {RouteHelper} from "../navigation/RouteHelper";
import {LoginTemplate} from "../templates/LoginTemplate";
import {View} from "native-base";
import {ViewWithBackgroundColor} from "../templates/ViewWithBackgroundColor";

let lastAccessToken = null;

export const Login = (props) => {

	const user = ConfigHolder.instance.getUser();

	console.log("User: ")
  console.log(user);

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
			Navigation.navigateTo(Navigation.DEFAULT_ROUTE_LOGIN);
		}
		return false;
	}

  async function handleContinue(){
	  Navigation.navigateHome();
    await ConfigHolder.instance.setHideDrawer(false, Navigation.DEFAULT_ROUTE_HOME);
  }

	async function fetchAccessToken(){
		//console.log("fetchAccessToken");
		if(!!directus_access_token){
		  if(lastAccessToken === directus_access_token){
		    return;
      } else {
        lastAccessToken = directus_access_token;
		    if(!user){
		     let successWithUrlToken = await fetchAccessTokenInUrl();
       }
      }
		} else {
			//console.log("No access token in url, finish loading")
		}
	}

  let drawerNeedsToBeHidden = !ConfigHolder.instance.isDrawerHidden();

  const isWeb = Platform.OS === "web";

  let isBrowserUrlCorrect = true;
  let currentRouteName = undefined;
  if(isWeb){
    console.log("Check: isBrowserUrlCorrect")
    let currentURL = window.location.href;
    console.log("currentURL: "+currentURL)
    currentRouteName = RouteHelper.getInitialRouteName(currentURL);
    console.log("currentRouteName: "+currentRouteName);
    isBrowserUrlCorrect = currentRouteName.startsWith(Navigation.DEFAULT_ROUTE_LOGIN);
  }

  async function handleUseEffect(){
    if(!isBrowserUrlCorrect){
      if(!!directus_access_token){ // There is an access token in the url, but the browser url is not correct
        let realInitialRouteName = window.location.href;
        realInitialRouteName = realInitialRouteName.split("?")[0];
        realInitialRouteName += "#"+Navigation.ROUTE_PATH_PREFIX+Navigation.DEFAULT_ROUTE_LOGIN+"?"+EnviromentHelper.getDirectusAccessTokenName()+"="+directus_access_token;
        window.location.href = realInitialRouteName;
        return;
      } else {
        Navigation.navigateTo(Navigation.DEFAULT_ROUTE_LOGIN);
        return;
      }
    }
    if(drawerNeedsToBeHidden){ // if drawer is not hidden yet and we need to hide it first
      let nextInitialRouteName = Navigation.DEFAULT_ROUTE_LOGIN+"?"+Navigation.paramsToURLSearch(params);
      ConfigHolder.instance.setHideDrawer(true, nextInitialRouteName); // hide drawer first
      return; // and return
    }
    if(!!user){
      handleContinue();
      return null;
    }
    fetchAccessToken();
    return;
  }

	// corresponding componentDidMount
	useEffect(() => {
    handleUseEffect();
	}, [props?.route?.params])

  /**
  if(!isBrowserUrlCorrect){
    console.log("Login: !isBrowserUrlCorrect return null")
    return null;
  }
   */

  /**
	if(drawerNeedsToBeHidden){ // if drawer needs to be hidden first we show a blank screen
	  console.log("Login: drawerNeedsToBeHidden return null");
	  return null;
	}
   */

  /**
  if(!!user){
    console.log("Login: has User: return null");
    return null;
  }
   */

  let finishedLoading = true;
  if(!!directus_access_token){
    finishedLoading = false;
  }

  return (
    <ViewWithBackgroundColor>
      <LoginTemplate>
        <WebViewLogin loaded={finishedLoading} user={user} handleContinue={handleContinue} />
      </LoginTemplate>
    </ViewWithBackgroundColor>
  )
}

Login.displayName = keyof({ Login });
