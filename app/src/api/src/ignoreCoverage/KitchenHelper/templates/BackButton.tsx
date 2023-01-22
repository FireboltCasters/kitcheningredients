// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, useColorMode, View,} from 'native-base';

import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Icon} from "../components/Icon";
import {useCustomHeaderTextColor} from "./useHeaderTextColor";
import {Navigation} from "../navigation/Navigation";

export const BackButton = ({color, ...props}: any) => {

  let usedColor = color || useCustomHeaderTextColor(props);

  return(
    <Button style={{backgroundColor: "transparent"}} onPress={Navigation.navigateBack} >
      <Icon name={"chevron-left"} color={usedColor} />
    </Button>
  )
};
