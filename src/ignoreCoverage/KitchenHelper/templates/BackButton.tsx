// @ts-nocheck
import React from 'react';
import {Box, Button, Heading, HStack, useColorMode, View,} from 'native-base';

import {NavigatorHelper} from "../navigation/NavigatorHelper";
import {Icon} from "../components/Icon";

export const BackButton = ({color, ...props}: any) => {

  return(
    <Button style={{backgroundColor: "transparent"}} onPress={NavigatorHelper.goBack} >
      <Icon name={"chevron-left"} color={color} />
    </Button>
  )
};
