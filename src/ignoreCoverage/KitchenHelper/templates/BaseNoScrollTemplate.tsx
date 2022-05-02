// @ts-nocheck
import React, {useEffect, useState} from "react";
import {BaseLayout} from "./BaseLayout";
import ServerAPI from "../ServerAPI";
import {View} from "native-base";
import {CookieInformation} from "../screens/legalRequirements/CookieInformation";
import {SafeAreaView} from "react-native";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";

export const BaseNoScrollTemplate = ({
								 children,
								 navigation,
								 title,
								 navigateTo,
								 serverInfo,
								 _status,
								 _hStack,
								 ...props}: any) => {

	const [reloadnumber, setReloadnumber] = useState(0)
	const [remoteServerInfo, setServerInfo] = useState(undefined)

	async function loadServerInfo() {
		try{
			let serverInfoRemote = await ServerAPI.getServerInfo();
			setServerInfo(serverInfoRemote);
			setReloadnumber(reloadnumber+1);
		} catch (err){
			console.log("Error at get Server Info");
			console.log(err);
		}
	}

	// corresponding componentDidMount
	useEffect(() => {
		if(!serverInfo){
			loadServerInfo();
		}
	}, [props.route.params])

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {...props});

	return(
		<SafeAreaView style={{height: "100%", width: "100%"}}>
		<View flex={1} flexDirection={"row"}>
		<BaseLayout title={title} serverInfo={serverInfo} >
			<View style={{width: "100%", height: "100%"}} >
          {childrenWithProps}
			</View>
		</BaseLayout>
		<CookieInformation />
		</View>
		</SafeAreaView>
	)
}
