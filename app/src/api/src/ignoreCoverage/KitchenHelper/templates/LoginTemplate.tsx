// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Flex, KeyboardAvoidingView, useBreakpointValue, View, Wrap} from "native-base";
import ServerAPI from "../ServerAPI";
import {Floaters} from "./Floaters";
import {ScrollViewWithGradient} from "../utils/ScrollViewWithGradient";
import {Platform, StatusBar} from "react-native";
import {ProjectBanner} from "../project/ProjectBanner";
import {ProjectBackground} from "../project/ProjectBackground";
import {ShowMoreGradientPlaceholder} from "../utils/ShowMoreGradientPlaceholder";
import {KitchenSafeAreaView} from "../components/KitchenSafeAreaView";
import {LegalRequiredLinks} from "../screens/legalRequirements/LegalRequiredLinks";

const titleBoxHeight = 64;

export const LoginTemplate: FunctionComponent = (props) => {
	/**
	breakpoints = {
		base: 0,
		sm: 480,
		md: 768,
		lg: 992,
		xl: 1280,
	};
	 */

  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0
  const keyboardVerticalOffset = paddingTop;
	const isSmallDevice = useBreakpointValue({
		base: true,
		md: false,
	})

	const [reloadnumber, setReloadnumber] = useState(0)
	const [serverInfo, setServerInfo] = useState(undefined)

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
		//loadServerInfo();
	}, [])

	function renderSpaceBetweenLogoAndSignIn(){
		return (
			<View style={{height: titleBoxHeight}}></View>
		)
	}

	function renderLeftSide(){

		let padding = isSmallDevice ? 20: 80;
		let width = isSmallDevice ? "100%" : 500;

		return(
			<Flex style={{width: width, height: "100%"}}>
        <KeyboardAvoidingView
          keyboardVerticalOffset = {keyboardVerticalOffset} // adjust the value here if you need more padding
          style={{flex: 1, width: "100%"}}
          behavior={Platform.OS === "ios" ? "padding" : "height"} >
				<ScrollViewWithGradient style={{flex: 1}}>
					<View style={{paddingHorizontal: padding, paddingTop: padding, height: "100%", width: "100%"}}>
						<ProjectBanner serverInfo={serverInfo} />
						{renderSpaceBetweenLogoAndSignIn()}
						{props.children}
					</View>
          <ShowMoreGradientPlaceholder />
				</ScrollViewWithGradient>
        </KeyboardAvoidingView>
				<Wrap
					flexDirection="row"
					justify="center"
				>
          <LegalRequiredLinks />
				</Wrap>
			</Flex>
		);
	}

	function renderRightSide(){
		if(isSmallDevice){
			return null;
		}

		return(
			<ProjectBackground />
		)
	}

	return (
    <KitchenSafeAreaView>
        <Flex
          style={{height: "100%", width: "100%"}}
          flexDirection="row"
        >
          {renderLeftSide()}
          {renderRightSide()}
          <Floaters />
        </Flex>
		</KitchenSafeAreaView>
	)
}
