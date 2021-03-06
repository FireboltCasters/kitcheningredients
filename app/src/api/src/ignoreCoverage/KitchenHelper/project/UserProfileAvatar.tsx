// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from 'react';
import {View} from "native-base";
import {UserItem} from "@directus/sdk";
import ServerAPI from "../ServerAPI";
import {DirectusImage} from "./DirectusImage";
import {TouchableOpacity} from "react-native";

import {Icon} from "../components/Icon";
import {ConfigHolder} from "./../ConfigHolder";

const titleBoxHeight = 64;

interface AppState {
	user?: UserItem;
	onPress?: () => void
	heightAndWidth?: string
}
export const UserProfileAvatar: FunctionComponent<AppState> = (props) => {

	const [displayUser, setUser] = useState(props.user || null);
	const [reloadnumber, setReloadnumber] = useState(0)

	const directus = ServerAPI.getClient();

	async function loadUserInformation(){
		let me = await ServerAPI.getMe(directus);
		setUser(me);
		setReloadnumber(reloadnumber+1);
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(!props.user){
			loadUserInformation();
		}
	}, [])

	let avatarAssetId = displayUser?.avatar;

	let content = (
		<Icon
			name={"account-circle"}
			style={{}}
		/>
	)

	if(!!avatarAssetId){
		content = <DirectusImage reloadnumber={reloadnumber+""} showLoading={true} assetId={avatarAssetId} style={{height: "100%", width: "100%"}} />;
	}

	let customUserAvatar = ConfigHolder.plugin?.renderCustomUserAvatar(displayUser);
	if(!!customUserAvatar){
	  content = customUserAvatar;
  }

	let dimension = props.heightAndWidth || titleBoxHeight;

	if(!!props.onPress){
		return(
			// @ts-ignore
			<TouchableOpacity onPress={props.onPress} style={{height: dimension, width: dimension, borderRadius: 6, alignItems: "center", justifyContent: "center"}}>
				{content}
			</TouchableOpacity>
		)
	} else {
		return(
			// @ts-ignore
			<View style={{height: dimension, width: dimension, borderRadius: 6, alignItems: "center", justifyContent: "center"}}>
				{content}
			</View>
		)
	}
}
