// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, Icon, useBreakpointValue, useColorMode, View,} from 'native-base';
import {Floaters} from './Floaters';
import {SafeAreaTop} from "./SafeAreaTop";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {NavigatorHelper} from "../navigation/NavigatorHelper";
import ServerAPI from "../ServerAPI";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {ConfigHolder} from "../ConfigHolder";
import {Layout} from "./Layout";

const padding = 0;


export const BaseLayout = ({
						   children,
						   navigation,
						   title,
						   doclink,
						   navigateTo,
						   _status,
						   _hStack,
						   ...props
					   }: any) => {

	let isSmallDevice = Layout.usesSmallDevice();

	/**
	 'lg': 992+320,
	 'xl': 1280+320, // +280 from MenuWidth
	 '2xl': 1536+320,
	 */

	const { colorMode, toggleColorMode } = useColorMode();

	const serverInfo = props.serverInfo || ServerAPI.tempStore.serverInfo;
	let ssoIconStyle = {};
	if(!!serverInfo){
		ssoIconStyle = ServerInfoHelper.getSsoIconStyle(serverInfo);
	}

	function renderHeading(){
		let defaultColor = ssoIconStyle.color || (colorMode == 'dark' ? 'white' : 'gray.800')

		let color = !!props.headingTextColor ? props.headingTextColor : defaultColor;
		let burgerButton = 	(
			<Button style={{backgroundColor: "transparent"}} onPress={NavigatorHelper.toggleDrawer} >
				<Icon as={MaterialCommunityIcons} name={"menu"} color={color}/>
			</Button>
		)

		if(!isSmallDevice){
			burgerButton = null;
		}

		return (
			<Heading
				color={color}
				// fontSize={{
				// 	lg: '3xl',
				// }}
				_web={{ py: 2 }}
				isTruncated
			>
				{burgerButton}
				{title ? title : ConfigHolder.config.title}
			</Heading>
		)
	}


	let headingBackgroundColor = props.headingBackgroundColor;
	if(!headingBackgroundColor){
		headingBackgroundColor = ssoIconStyle.background || "transparent";
	}

	let backgroundStyle = !props.headingBackgroundStyle ? {backgroundColor: headingBackgroundColor} : undefined;
	return (
		<>
			<SafeAreaTop
				{..._status}
			/>
			<Box
				style={{paddingHorizontal: padding, margin: 0}}
				{...props}
				flex={1}
				px={4}
				mx="auto"
				pt={navigation ? '70px' : 0}
				width={"100%"}
				// style={{
				// 	backdropFilter: 'blur(10px)',
				// }}
			>
				<HStack
					left={0}
					top={0}
					right={0}
					px={4}
					zIndex={-1}
					{..._hStack}
					style={backgroundStyle}
				>
					<HStack py={2}
						// alignItems="flex-end"
							alignItems="center"
							w="100%"
					>

						{/* <HStack alignItems="center" justifyContent="center"> */}
						{/* <ChevronLeftIcon /> */}
						{renderHeading()}
						{/* </HStack> */}
						{/* <Text color={colorMode == 'dark' ? 'white' : 'gray.800'}>v3</Text> */}
					</HStack>
				</HStack>
				<View style={{width: "100%", flex: 1, alignItems: "center"}} onLayout={props.onLayout}>
					{children}
				</View>
			</Box>
			<Floaters />
		</>
	);

	// { base: '100%', lg: '768px', xl: '1080px' }
};
