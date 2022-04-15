// @ts-nocheck
import React from "react";
import {useColorModeValue, useToken, View} from "native-base";
import {LinearGradient} from "expo-linear-gradient";
import ShowMoreGradientPlaceholder from "./ShowMoreGradientPlaceholder";
import App from "../App";

export const ShowMoreGradient = (props) => {
	const [lightBg, darkBg] = useToken(
		'colors',
		[App.styleConfig.backgroundColor.light, App.styleConfig.backgroundColor.dark],
		'blueGray.900',
	);
	const bgColor = useColorModeValue(lightBg, darkBg);
	const gradColors = [bgColor+'00', bgColor+'FF'];

	return (
		<View style={[{width: "100%", position: "absolute", bottom: 0, height: "auto"}]}>
			<ShowMoreGradientPlaceholder />
			<View style={{position: "absolute", height: "100%", width: "100%", bottom: 0}}>
				<LinearGradient
					style={{flex: 4}}
					colors={gradColors}
					pointerEvents={'none'}
				/>
				<View style={{flex: 1, backgroundColor: bgColor}} />
			</View>
		</View>
	);
}