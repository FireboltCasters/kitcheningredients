// @ts-nocheck
import {Icon as NativeBaseIcon, Text} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";
import {useThemeTextColor} from "../helper/HelperHooks";

interface AppState {
  invert?: boolean;
  useDarkTheme?: boolean
}
export const Icon: FunctionComponent<InterfaceIconProps & AppState> = ({as, size, invert, useDarkTheme, ...props}) => {

  const defaultColor = useThemeTextColor(invert, useDarkTheme);

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
