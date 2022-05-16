// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, useColorMode, View,} from 'native-base';

import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Icon} from "../components/Icon";

export const DrawerButton = ({color, ...props}: any) => {

  return(
    <Button style={{backgroundColor: "transparent"}} onPress={NavigatorHelper.toggleDrawer} >
      <Icon name={"menu"} color={color}/>
    </Button>
  )
};
