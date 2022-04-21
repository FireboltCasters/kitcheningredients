// @ts-nocheck
import React from "react";
import {ConfigHolder} from "../helper/ConfigHolder";
import {View, Text} from "react-native";

export const ConfigHolderTest = (props) => {

		return (
			<View style={{alignItems: "center", flexDirection: "row", margin: 3}}>
				<Text>{props.children}{ConfigHolder.test["a"]}</Text>
			</View>
		)
}
