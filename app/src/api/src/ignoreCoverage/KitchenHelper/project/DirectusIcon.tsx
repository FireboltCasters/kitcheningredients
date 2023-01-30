// @ts-nocheck
import React, {FunctionComponent} from 'react';
import {Icon} from "../components/Icon";
import {MaterialIcons} from "@expo/vector-icons";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";

export const DirectusIcon: FunctionComponent<InterfaceIconProps> = (props) => {
  // replace all _ with - for icon names
  let icon = props?.name || "";
  icon = icon.replace(/_/g, "-");

  let family = MaterialIcons;
  return <Icon as={family} name={icon} {...props} />
}
