// @ts-nocheck
import {Icon as NativeBaseIcon} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";
import {useThemeTextColor} from "../helper/HelperHooks";

export const Icon: FunctionComponent<InterfaceIconProps> = ({as, size, ...props}) => {

  const defaultColor = useThemeTextColor();

  let defaultAs = MaterialCommunityIcons;
  if(!!as){
    defaultAs = as;
  }

  let defaultSize = "lg";
  let useSize = defaultSize;
  if(!!size){
    useSize = size;
  }

  const color = props?.color || defaultColor;

	return (
    <NativeBaseIcon as={defaultAs} {...props} size={useSize} color={color} />
  )
}
