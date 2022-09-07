// @ts-nocheck
import React from 'react';
import {useColorMode,} from 'native-base';
import ServerAPI from "../ServerAPI";
import {ServerInfoHelper} from "../helper/ServerInfoHelper";

export function useCustomHeaderTextColor(props?) {
  const { colorMode, toggleColorMode } = useColorMode();
  const serverInfo = ServerAPI.tempStore.serverInfo;
  let ssoIconStyle = {};
  if(!!serverInfo){
    ssoIconStyle = ServerInfoHelper.getSsoIconStyle(serverInfo);
  }
  let defaultColor = ssoIconStyle.color || (colorMode == 'dark' ? 'white' : 'gray.800')
  let color = !!props.headingTextColor ? props.headingTextColor : defaultColor;
  return color;
}
