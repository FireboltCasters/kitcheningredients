// @ts-nocheck
import React, {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EnviromentHelper from "../EnviromentHelper";
import {navigationRef, isReadyRef, NavigatorHelper} from "./NavigatorHelper";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {ConfigHolder} from "../ConfigHolder";
import {ViewWithBackgroundColor} from "../templates/ViewWithBackgroundColor";
import {useBackgroundColor} from "../templates/useBackgroundColor";
import {Linking} from "react-native";
import {Navigation} from "./Navigation";
import {PlatformHelper} from "../helper/PlatformHelper";

export const Root = (props) => {
	const bgColor = useBackgroundColor()

  const routeNameRef = useRef();

	React.useEffect(() => {
		return () => {
			isReadyRef.current = false
		};
	}, []);

	let subroute = "myapp/app/";
	try{
		let basePath = EnviromentHelper.getBasePath();
		subroute = basePath;
	} catch (err){
		console.log("Trying to get Basepath");
		console.log(err)
	}

	let prefixes = ["myapp:///", "http://localhost:19006/#/"];
	if(!!ConfigHolder.prefixes && ConfigHolder.prefixes.length> 0){
	      prefixes = ConfigHolder.prefixes;
  }
	//let linking = RegisteredRoutesMap.getRouteLinkingConfig(subroute, prefixes);

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				isReadyRef.current = true;
        routeNameRef.current = navigationRef.current.getCurrentRoute().name
        NavigatorHelper.handleNavigationQueue();
			}}
      onStateChange={async () => {
        let trackScreenView = () => {}

        if(NavigatorHelper.isNavigationLoaded()){
          const previousRouteName = routeNameRef.current;
          const currentNavigation = NavigatorHelper.getCurrentNavigation();
          if(!!currentNavigation && !!currentNavigation.getCurrentRoute){
            const currentRoute = currentNavigation.getCurrentRoute()
            console.log("onStateChange");
            console.log("currentRoute", currentRoute);
            const currentRouteName = currentRoute.name;
            const currentRouteParams = currentRoute.params || {};
            trackScreenView = () => {
              if(PlatformHelper.isWeb()){
                let navigateSearch;
                let navigateSearchParams = Navigation.paramsToURLSearch(currentRouteParams);
                if(navigateSearchParams){
                  navigateSearch = "?"+navigateSearchParams;
                } else {
                  navigateSearch = "";
                }
                //console.log("After changing the hash, the hook will be called again, so we do not need to call navigateTo again");
                //@ts-ignore

                // This handle goBack and goForward in the browser, since the hashchange event is not triggered
                window.location.hash = Navigation.ROUTE_PATH_PREFIX+currentRouteName+navigateSearch;
              }
              // Your implementation of analytics goes here!

            };
          }
        }

        //if (previousRouteName !== currentRouteName) {
          // Replace the line below to add the tracker from a mobile analytics SDK
          await trackScreenView(currentRouteName);
        //}

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}
			// @ts-ignore //this is correct
//      linking={linking}
			theme={{
				// @ts-ignore
				colors: { background: bgColor },
			}}
		>
      <ViewWithBackgroundColor>
        {props.children}
      </ViewWithBackgroundColor>
		</NavigationContainer>
	);
};
