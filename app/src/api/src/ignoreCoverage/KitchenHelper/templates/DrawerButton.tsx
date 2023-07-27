// @ts-nocheck
import React, {FunctionComponent} from 'react';

import {Icon} from "../components/Icon";
import {Navigation} from "../navigation/Navigation";
import {ConfigHolder} from "../ConfigHolder";
import {TranslationKeys} from "../translations/TranslationKeys";
import {MyTouchableOpacity} from "../components/buttons/MyTouchableOpacity";
import {useContrastText} from "native-base";
import {useMyContrastColor} from "../theme/useMyContrastColor";

export interface AppState{
  color?: string;
  closeDrawer?: boolean
  useTextColor?: boolean
  backgroundColor?: string
}
export const DrawerButton: FunctionComponent<AppState> = ({color, useTextColor, closeDrawer, ...props}) => {

  let usedColor = color;

  const headerBackgroundColor = props?.backgroundColor;
  if(!usedColor){
    usedColor = useMyContrastColor(headerBackgroundColor);
  }

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const accessibilityLabel = useTranslation(TranslationKeys.sidebar_menu);

  function onPress(){
    if(closeDrawer){
      Navigation.drawerClose();
    } else {
      Navigation.drawerToggle();
    }
  }

  let icon = <Icon name={"menu"} color={usedColor}/>;
  if(closeDrawer){
    icon = <Icon name={"close"} color={usedColor}/>;
  }

  return(
    <MyTouchableOpacity accessibilityLabel={accessibilityLabel} style={{padding: 12}} onPress={onPress} >
      {icon}
    </MyTouchableOpacity>
  )
};
