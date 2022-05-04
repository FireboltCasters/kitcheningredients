// @ts-nocheck
import {Icon as NativeBaseIcon} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";

export const Icon: FunctionComponent<InterfaceIconProps> = (props) => {

  let defaultAs = props.as || MaterialCommunityIcons;

	return (
    <NativeBaseIcon as={defaultAs} {...props} />
  )
}
