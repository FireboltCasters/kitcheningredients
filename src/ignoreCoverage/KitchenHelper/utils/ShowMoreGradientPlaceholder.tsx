// @ts-nocheck
import React from "react";
import {Box, Icon, View} from "native-base";
import {Ionicons} from "@expo/vector-icons";

export const ShowMoreGradientPlaceholder = (props) => {

		return (
			<View style={{opacity: 0}}>
					<Box style={{padding: 12}} >
						<Icon
							as={Ionicons}
							_dark={{ name: 'sunny', color: 'orange.400' }}
							_light={{ name: 'moon', color: 'blueGray.100' }}
							size="md"
						/>
						<Icon
							as={Ionicons}
							_dark={{ name: 'sunny', color: 'orange.400' }}
							_light={{ name: 'moon', color: 'blueGray.100' }}
							size="md"
						/>
					</Box>
			</View>
    );

}
