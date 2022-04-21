// @ts-nocheck
import React, {FunctionComponent, useState} from 'react';
import {Image, Pressable, View} from "native-base";
import ServerAPI from "../ServerAPI";
import {LoadingView} from "./LoadingView";
import {TouchableOpacity} from "react-native";
import {ConfigHolder} from "../ConfigHolder";

interface AppState {
	assetId: string;
	alt?: string;
	style?: any;
	showLoading?: boolean
	isPublic?: boolean
	onPress?: () => {}
}
export const DirectusImage: FunctionComponent<AppState> = (props) => {

	const [loading, setLoading] = useState(true);
	// TODO: https://docs.directus.io/configuration/project-settings/#files-thumbnails
	// add key, fit, width, etc. as parameters here also


	//{height: "40px", width: "40px"}

	let content = null;

	if(!!props.assetId){
		let imageURL = ServerAPI.getAssetImageURL(props.assetId);
		let url = imageURL;
		console.log(url);
		if(!props.isPublic){
			let token = ConfigHolder.storage.get_auth_access_token();
			if(!!url && !!token){
				if(!url.includes("?")){
					url+="?";
				}
				url+="&access_token="+token;
			}
		}
		let source={
			uri: url
		}

		content = (<>
			<Image source={source} alt={props.alt} style={props.style} ignoreFallback={true}
				   onLoadEnd={() => {
					   setLoading(false)
				   }}
			/>
			{props.showLoading && loading && <LoadingView/>}
		</>)
	}

	let pressWrapper = content;

	if(!!props.onPress){
		pressWrapper = (
			<TouchableOpacity onPress={props.onPress} style={props.style} >
				{content}
			</TouchableOpacity>
		)
	}

	return(
		<View style={props.style}>
			{pressWrapper}
		</View>
	)
}
