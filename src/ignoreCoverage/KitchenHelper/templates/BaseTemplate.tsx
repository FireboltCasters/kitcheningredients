// @ts-nocheck
import React, {useEffect, useState} from "react";
import {BaseLayout} from "./BaseLayout";
import {ScrollViewWithGradient} from "../utils/ScrollViewWithGradient";
import ServerAPI from "../ServerAPI";
import {Box, View} from "native-base";
import {BreakPointLayout} from "./BreakPointLayout";
import {CookieInformation} from "../screens/legalRequirements/CookieInformation";
import {SafeAreaView} from "react-native";
import {Layout} from "./Layout";
import {CloneChildrenWithProps} from "../helper/CloneChildrenWithProps";

export const BaseTemplate = ({
								 children,
								 navigation,
								 title,
								 navigateTo,
								 serverInfo,
								 _status,
								 _hStack,
								 ...props}: any) => {

  const [dimension, setDimenstion] = useState({width: undefined, height: undefined})
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

  function setDimensions(event){
    const {width, height} = event.nativeEvent.layout;
    // We can set the state to allow for reference through the state property, and will also change
    setDimenstion({width: width, height: height});
  }

  const childrenWithProps = CloneChildrenWithProps.passProps(children, {dimension: dimension});

	return(
		<SafeAreaView style={{height: "100%", width: "100%"}}>
		<View flex={1} flexDirection={"row"}>
		<BaseLayout title={title} serverInfo={serverInfo} >
			<ScrollViewWithGradient hideGradient={true} style={{width: "100%", height: "100%"}} onLayout={setDimensions} >
				<BreakPointLayout >
					<Box style={{height: "100%", alignItems: "flex-start", width: "100%"}}>
						{childrenWithProps}
					</Box>
				</BreakPointLayout>
			</ScrollViewWithGradient>
		</BaseLayout>
		<CookieInformation />
		</View>
		</SafeAreaView>
	)
}

BaseTemplate.useBaseTemplateContentWidth = Layout.useBaseTemplateContentWidth;
