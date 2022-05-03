import React, {useEffect, useState} from "react";
import {Flex, Input, Text, View} from "native-base";
import {CrossLottie} from "kitcheningredients";

export const LottieExample = (props) => {

	return(
		<View>
			<Text>{"Lottie Files are awesome"}</Text>
			<CrossLottie example={true} style={{height: 500, width: 500}} />
			<Text>{"They are lightweight, scalable animations (https://lottiefiles.com/)"}</Text>
			<Text>{"Around 600% smaller when compared to gif's"}</Text>
		</View>
	)
}