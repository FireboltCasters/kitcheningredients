// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Icon, Input, Pressable, Text, TextArea, View} from "native-base";
import {MyThemedBox} from "../../helper/MyThemedBox";

export interface AppState {
	storageKey?: any;
	value?: any;
	setValue?: any;
	readOnly?: boolean
}
export const SynchedValue: FunctionComponent<AppState> = (props) => {

	const [value, setValue] = React.useState(props.value)

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	const handleChange = (event: any) => setValue(event.target.value)

	function renderValue(){
		if(props.readOnly){
			return(
				<Text>{value}</Text>
			)
		} else {
			return(
			<>
				<Input
					value={value}
					w={"100%"}
					onChange={handleChange}
					placeholder="Value Controlled Input"
				/>
				<Button onPress={() => {
					props.setValue(value);
				}} >{"Change"}</Button>
			</>
			)
		}
	}

	return(
		<>
			<MyThemedBox style={{margin: 5, padding: 5}} _shadeLevel={2} >
				<Text>{props.storageKey}</Text>
				{renderValue()}
			</MyThemedBox>
		</>
	)
}
