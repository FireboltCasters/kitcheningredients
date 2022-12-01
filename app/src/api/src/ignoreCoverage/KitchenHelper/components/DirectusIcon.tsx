// @ts-nocheck
import {Icon as NativeBaseIcon} from "native-base";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";

export const DirectusIcon: FunctionComponent<InterfaceIconProps> = ({as, name, size, ...props}) => {

  name = name.replace(/_/g, "-");

  let defaultSize = "lg";
  if(!!size){
    defaultSize = size;
  }


	return (
    <NativeBaseIcon size={defaultSize} name={name} as={MaterialIcons} {...props} />
  )
}
