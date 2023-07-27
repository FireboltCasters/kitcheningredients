// @ts-nocheck
import React from 'react';
import {Box, HStack, View,} from 'native-base';
import {SafeAreaTop} from "./SafeAreaTop";
import {ConfigHolder} from "../ConfigHolder";
import {useProjectColor} from "./useProjectColor";
import {HeaderWithActions} from "./HeaderWithActions";

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

	const ssoIconColor = useProjectColor();

	function renderBaseLayoutContent(){
	  let pluginRenderBaseLayoutContent = ConfigHolder.plugin.renderBaseLayoutContent;

	  return (
      pluginRenderBaseLayoutContent(
        <View style={{width: "100%", flex: 1, alignItems: "center"}} onLayout={props.onLayout}>
          {children}
        </View>
      )
    )
  }

  function renderHeadingContent(){
    if(header!==undefined){
      return header;
    } else {
      return(
        <HeaderWithActions
          headerBackgroundColor={ssoIconColor}
          title={title}
          showbackbutton={showbackbutton}
        />
      )
    }
  }

	let headingBackgroundColor = props.headingBackgroundColor;
	if(!headingBackgroundColor){
		headingBackgroundColor = ssoIconColor;
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
					px={0}
					zIndex={-1}
					{..._hStack}
					style={backgroundStyle}
				>
					<HStack py={0}
						// alignItems="flex-end"
							alignItems="center"
							w="100%"
					>
            {renderHeadingContent()}
					</HStack>
				</HStack>
				<View style={{width: "100%", flex: 1, alignItems: "center"}} >
          {renderBaseLayoutContent()}
				</View>

			</Box>
		</>
	);

	// { base: '100%', lg: '768px', xl: '1080px' }
};
