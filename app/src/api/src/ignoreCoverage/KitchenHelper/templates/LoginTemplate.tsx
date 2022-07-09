// @ts-nocheck
import React, {FunctionComponent, useEffect, useState} from 'react';
import {Flex, useBreakpointValue, View, Wrap, KeyboardAvoidingView} from "native-base";
import ServerAPI from "../ServerAPI";
import {Floaters} from "./Floaters";
import {ScrollViewWithGradient} from "../utils/ScrollViewWithGradient";
import {Platform, SafeAreaView, StatusBar, useWindowDimensions} from "react-native";
import {PrivacyPolicy} from "../screens/legalRequirements/PrivacyPolicy";
import {AboutUs} from "../screens/legalRequirements/AboutUs";
import {License} from "../screens/legalRequirements/License";
import {TermsAndConditions} from "../screens/legalRequirements/TermsAndConditions";
import {ProjectBanner} from "../project/ProjectBanner";
import {InternalLink} from "../navigation/InternalLink";
import {ProjectBackground} from "../project/ProjectBackground";
import {ShowMoreGradientPlaceholder} from "../utils/ShowMoreGradientPlaceholder";
import {KitchenSafeAreaView} from "../components/KitchenSafeAreaView";

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
				<ScrollViewWithGradient style={{flex: 1}}>
					<View style={{paddingHorizontal: padding, paddingTop: padding, height: "100%", width: "100%"}}>
						<ProjectBanner serverInfo={serverInfo} />
						{renderSpaceBetweenLogoAndSignIn()}
						{props.children}
					</View>
          <ShowMoreGradientPlaceholder />
				</ScrollViewWithGradient>
				<Wrap
					flexDirection="row"
					justify="center"
				>
					<InternalLink destination={AboutUs} fontSize={"sm"}>{"About Us"}</InternalLink>
					<InternalLink destination={License} fontSize={"sm"}>{"License"}</InternalLink>
					<InternalLink destination={PrivacyPolicy} fontSize={"sm"}>{"Privacy Policy"}</InternalLink>
					<InternalLink destination={TermsAndConditions} fontSize={"sm"}>{"Terms & Conditions"}</InternalLink>
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

  const paddingTop = Platform.OS === "android" ? StatusBar.currentHeight : 0
  const keyboardVerticalOffset = paddingTop;

	return (
    <KitchenSafeAreaView>
      <KeyboardAvoidingView
        keyboardVerticalOffset = {keyboardVerticalOffset} // adjust the value here if you need more padding
        style={{height: "100%", width: "100%"}}
        behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <Flex
          style={{height: "100%", width: "100%"}}
          flexDirection="row"
        >
          {renderLeftSide()}
          {renderRightSide()}
          <Floaters />
        </Flex>
      </KeyboardAvoidingView>
		</KitchenSafeAreaView>
	)
}
