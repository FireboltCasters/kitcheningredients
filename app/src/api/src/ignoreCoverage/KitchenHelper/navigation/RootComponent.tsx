// @ts-nocheck
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import EnviromentHelper from "../EnviromentHelper";
import {navigationRef, isReadyRef, NavigatorHelper} from "./NavigatorHelper";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {ConfigHolder} from "../ConfigHolder";
import {ViewWithBackgroundColor} from "../templates/ViewWithBackgroundColor";
import {useBackgroundColor} from "../templates/useBackgroundColor";
import {Linking} from "react-native";

export const Root = (props) => {
	const bgColor = useBackgroundColor()

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
	let linking = RegisteredRoutesMap.getRouteLinkingConfig(subroute, prefixes);

  const getInitialURL = async () => {
    console.log("getInitialURL");

    const url = await Linking.getInitialURL();
    console.log(url);

    if (url != null) {
      return url;
    }

    return url;
  };

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				isReadyRef.current = true;
        NavigatorHelper.handleNavigationQueue();
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
