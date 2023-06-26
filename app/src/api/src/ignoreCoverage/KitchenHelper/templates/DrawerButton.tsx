// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, Tooltip, useColorMode, View,Text} from 'native-base';

import {Icon} from "../components/Icon";
import {useCustomHeaderTextColor} from "./useHeaderTextColor";
import {Navigation} from "../navigation/Navigation";
import {ConfigHolder} from "../ConfigHolder";
import {TranslationKeys} from "../translations/TranslationKeys";
import {MyTouchableOpacity} from "../buttons/MyTouchableOpacity";

export const DrawerButton = ({color, ...props}: any) => {

  let usedColor = color || useCustomHeaderTextColor(props);

  const useTranslation = ConfigHolder.plugin.getUseTranslationFunction();
  const accessibilityLabel = useTranslation(TranslationKeys.sidebar_menu);

  return(
    <MyTouchableOpacity accessibilityLabel={accessibilityLabel} style={{backgroundColor: "transparent"}} onPress={Navigation.drawerToggle} >
      <Icon name={"menu"} color={usedColor}/>
    </MyTouchableOpacity>
  )
};
