// @ts-nocheck
import React, {FunctionComponent} from 'react'
import {Platform} from "react-native";
import App from "../App";

let LottiePlatformSpecific;

if(Platform.OS==="web"){
  LottiePlatformSpecific = App;
} else {
  LottiePlatformSpecific = require("./CodePushWrapperNative").CodePushWrapperNative;
}

export const CodePushWrapper = (props) => {

  return <LottiePlatformSpecific {...props} />

}
