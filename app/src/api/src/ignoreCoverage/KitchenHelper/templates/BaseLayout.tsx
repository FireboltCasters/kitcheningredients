// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, useColorMode, View,} from 'native-base';
import {Floaters} from './Floaters';
import {SafeAreaTop} from "./SafeAreaTop";

import {NavigatorHelper} from "../navigation/NavigatorHelper";
import ServerAPI from "../ServerAPI";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";
import {ConfigHolder} from "../ConfigHolder";
import {Layout} from "./Layout";
import {Icon} from "../components/Icon";
import {DrawerButton} from "./DrawerButton";
import {BackButton} from "./BackButton";

export const BaseLayout = ({
						   children,
						   navigation,
						   title,
               showbackbutton,
               header,
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
	  if(!!header){
	    return header;
    }

		let defaultColor = ssoIconStyle.color || (colorMode == 'dark' ? 'white' : 'gray.800')

		let color = !!props.headingTextColor ? props.headingTextColor : defaultColor;


    /**
    if(!isSmallDevice){
      leftButton = null;
    }
   */

    let drawerButton = <DrawerButton color={color} />
    let leftButton = drawerButton

    if(!!showbackbutton){ //show alsways the back button even on small devices
        leftButton = <BackButton color={color} />
    }

		return (
		  <>
        {leftButton}
        <Heading
          color={color}
          // fontSize={{
          // 	lg: '3xl',
          // }}
          _web={{ py: 2 }}
          isTruncated

        >

          {title ? title : ConfigHolder.config.title}
        </Heading>
      </>
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
				style={{paddingHorizontal: 0, margin: 0}}
				{...props}
				flex={1}
				px={0}
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
