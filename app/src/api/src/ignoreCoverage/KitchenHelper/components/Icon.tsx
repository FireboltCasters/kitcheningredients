// @ts-nocheck
import {Icon as NativeBaseIcon} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";

export const Icon: FunctionComponent<InterfaceIconProps> = ({as, ...props}) => {

  let defaultAs = MaterialCommunityIcons;
  if(!!as){
    defaultAs = as;
  }

  let defaultSize = "lg";
  if(!!size){
    defaultSize = size;
  }


	return (
    <NativeBaseIcon as={defaultAs} {...props} size={defaultSize} />
  )
}
