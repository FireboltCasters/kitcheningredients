// @ts-nocheck
import React, {FunctionComponent} from "react";
import {InternalLink} from "../../navigation/InternalLink";
import {MenuItem} from "../../navigation/MenuItem";
import {Navigation} from "../../navigation/Navigation";
import {View} from "native-base";

interface AppState {
  requiredMenuKey?: string;
}
export const LegalRequiredInternalLink : FunctionComponent<AppState> = (props) => {

  let requiredMenuKey = props?.requiredMenuKey;
  let menuItem: MenuItem = Navigation.requiredMenuItems[requiredMenuKey];
  let label = menuItem?.label;

  console.log(menuItem)

  return (
    <View>
      <InternalLink accessibilityLabel={label} destination={menuItem?.route?.path} fontSize={"sm"}>{label}</InternalLink>
    </View>
  )

  //
}
