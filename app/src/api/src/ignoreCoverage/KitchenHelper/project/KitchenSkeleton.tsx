// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {Skeleton, View} from "native-base";

export const KitchenSkeleton: FunctionComponent = (props) => {
	return (
		<View {...props} >
			<Skeleton height={"100%"} width={"100%"}/>
		</View>
	);
}
