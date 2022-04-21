// @ts-nocheck
import React, {FunctionComponent, useEffect} from 'react';
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Divider, Flex, Spinner, Text, View} from "native-base";
import {UserItem} from "@directus/sdk";
import {SignOutButton} from "./SignOutButton";
import {EmailLogin} from "./EmailLogin";
import {AuthProvidersLoginOptions} from "./AuthProvidersLoginOptions";
import {RegisteredRoutesMap} from "../navigation/RegisteredRoutesMap";
import {FormButton} from "../buttons/FormButton";
import {ConfigHolder} from "../ConfigHolder";

export interface WebViewLoginFormState {
	user?: UserItem;
	refresh: () => void,
	loaded: boolean
}
export const WebViewLogin: FunctionComponent<WebViewLoginFormState> = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [])

	function renderSignIn(){
		return(
			<View>
				<Text fontSize="4xl" fontWeight={800}>
					{"Sign in"}
				</Text>
			</View>
		)
	}

	function renderLoginOptions(){
		let user = props.user;
		if(!props.loaded){
			return(
				<View style={{flex: 1}}>
					<View style={{marginVertical: 20}}></View>
					<Spinner />
					<View style={{marginVertical: 20}}></View>
				</View>
			)
		}
		if(!!user){
			let identifier = user.email || user.first_name;
			return(
				<View style={{flex: 1}}>
					<View style={{marginVertical: 20}}></View>
					<Text><Text bold={true} >{identifier}</Text> is currentrly authenticated. If you recognize this account, press continue.</Text>
					<View style={{marginVertical: 20}}></View>
					<Flex direction={"row"} justify={"space-between"}>
						<SignOutButton />
						<FormButton onPress={async () => {
							await NavigatorHelper.navigate(RegisteredRoutesMap.getHome())
							await ConfigHolder.instance.setHideDrawer(false);
							//
						}}>
							{"Continue"}
						</FormButton>
					</Flex>
				</View>
			)
		} else {
			return(
				<>
					<EmailLogin />
					<View style={{marginVertical: 20}} >
						<Divider />
					</View>
					<AuthProvidersLoginOptions />
				</>
			)
		}
	}

	return (
		<>
			{renderSignIn()}
			{renderLoginOptions()}
		</>
	)
}
