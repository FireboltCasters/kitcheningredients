// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, useColorMode, View,} from 'native-base';

import {Icon} from "../components/Icon";
import {useCustomHeaderTextColor} from "./useHeaderTextColor";
import {Navigation} from "../navigation/Navigation";

export const DrawerButton = ({color, ...props}: any) => {

  let usedColor = color || useCustomHeaderTextColor(props);

  return(
    <Button style={{backgroundColor: "transparent"}} onPress={Navigation.drawerToggle} >
      <Icon name={"menu"} color={usedColor}/>
    </Button>
  )
};
