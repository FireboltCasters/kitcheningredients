// @ts-nocheck
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Box, useColorModeValue, useToken, View} from 'native-base';
import EnviromentHelper from "../EnviromentHelper";
import {RouteRegisterer} from "./RouteRegisterer";
import {navigationRef, isReadyRef} from "./NavigatorHelper";
import {RegisteredRoutesMap} from "./RegisteredRoutesMap";
import {ConfigHolder} from "../ConfigHolder";

export const Root = (props) => {
	const [lightBg, darkBg] = useToken(
		'colors',
		[ConfigHolder.styleConfig.backgroundColor.light, ConfigHolder.styleConfig.backgroundColor.dark],
		'blueGray.900',
	);
	const bgColor = useColorModeValue(lightBg, darkBg);

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

	let prefixes = ["myapp:///"];
	const linking = RegisteredRoutesMap.getRouteLinkingConfig(subroute, prefixes);

  console.log("Root: ");
  console.log(props);

	return (
		<NavigationContainer
			ref={navigationRef}
			onReady={() => {
				isReadyRef.current = true;
			}}
			// @ts-ignore //this is correct
			linking={linking}
			theme={{
				// @ts-ignore
				colors: { background: bgColor },
			}}
		>
			<View style={{flex: 1, width: "100%", backgroundColor: bgColor}}
			>
				{props.children}
			</View>
		</NavigationContainer>
	);
};
