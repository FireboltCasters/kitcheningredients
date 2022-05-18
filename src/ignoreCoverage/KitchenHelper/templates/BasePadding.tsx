// @ts-nocheck
import React, {FunctionComponent, useContext} from 'react';
import {Text, Box, Button, Heading, HStack, useBreakpointValue, useColorMode, View,} from 'native-base';
import {Layout} from "./Layout";

export const BasePadding = ({
	children,
	...props
}: any) => {

  const padding = 16;

	return (
			<Box
				style={{padding: padding, flex: 1, margin: 0 ,alignItems: "flex-start"}}
				flex={1}
				width={"100%"}
			>
					{children}
			</Box>
	);
};
