// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {Flex, Link, Text, useColorMode, View,} from "native-base";
import {MaterialIcons} from "@expo/vector-icons"
import EnviromentHelper from "../EnviromentHelper";
import {StringHelper} from "../helper/StringHelper";
import ServerAPI from "../ServerAPI";
import {URL_Helper} from "../helper/URL_Helper";
import {Provider} from "./Provider";
import {TouchableOpacity} from "react-native";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {Icon} from "../components/Icon";
import {DirectusIcon} from "../components/DirectusIcon";

interface AppState {
	serverInfo: any;
	loading?: boolean,
	provider: Provider;
	buttonText?: any;
	callback?: any;
  fromDirectus?: boolean;
}

export const AuthProvider: FunctionComponent<AppState> = ({serverInfo, fromDirectus, provider, buttonText, callback}) => {

	function getUrlToProvider(provider: string){
		provider= provider.toLowerCase();
		let currentLocation = URL_Helper.getCurrentLocationWithoutQueryParams();
		let redirectURL = currentLocation;
		let redirect_with_access_token = "?redirect="+ServerAPI.getAPIUrl()+"/redirect-with-token?redirect="+redirectURL+"?"+EnviromentHelper.getDirectusAccessTokenName()+"=";
		return ServerAPI.getAPIUrl()+"/auth/login/"+provider+redirect_with_access_token;
	}

	function renderIcon(icon, color){
	  if(typeof icon!=="string"){
	    return icon(color);
    }

	  if(fromDirectus){
	    return <DirectusIcon name={icon} color={color} />
    }

	  let family = MaterialIcons;

	  if(icon==="incognito-circle"){
	    family = null;
    }

		return (
			<Icon
				name={icon}
        as={family}
				color={color}
				style={{}}
			/>
		);
	}


	let providerName = provider?.name || "";
	let icon = provider?.icon;

	if(!!icon && icon!=="incognito-circle"){
	  // replace all _ with - for icon names
    icon = icon.replace(/_/g, "-");
    console.log("icon", icon);
  }

	const { colorMode, toggleColorMode } = useColorMode();

	let ssoIconStyle = ServerInfoHelper.getSsoIconStyle(serverInfo);

	let iconBackgroundColor = ssoIconStyle?.background;
	let iconColor = ssoIconStyle?.color || (colorMode == 'dark' ? 'white' : 'gray.800')

	let url = getUrlToProvider(providerName);
	let providerNameReadable = StringHelper.capitalizeFirstLetter(providerName);
	if(!!provider?.label){
	      providerNameReadable = provider?.label;
  }

	let text = buttonText || "Log in with "+providerNameReadable;

	let content = (
		<Flex flexDirection={"row"} _light={{backgroundColor: "rgb(240, 244, 249)"}} _dark={{backgroundColor: "darkgray"}} style={{borderRadius: 6, flex: 1, margin: 12}}>
			<View style={{height: 60, width: 60, alignItems: "center", justifyContent: "center", backgroundColor: iconBackgroundColor, borderRadius: 6}}>
				{renderIcon(icon, ssoIconStyle.color)}
			</View>
			<View style={{justifyContent: "center", flex: 1, paddingLeft: 20}}>
				<Text>{text}</Text>
			</View>
		</Flex>
	);

	if(!!callback){
		return (
			<TouchableOpacity onPress={() => {callback()}} >
				{content}
			</TouchableOpacity>
		)
	}

	return (
		<Link key={"Link"+providerName} href={url} >
			{content}
		</Link>
	)
}
