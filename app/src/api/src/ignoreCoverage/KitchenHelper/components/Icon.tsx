// @ts-nocheck
import {Icon as NativeBaseIcon} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";
import {useThemeTextColor} from "../helper/HelperHooks";

interface AppState {
  invert?: boolean;
}
export const Icon: FunctionComponent<InterfaceIconProps & AppState> = ({as, size, invert, ...props}) => {

  const defaultColor = useThemeTextColor(invert);

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
