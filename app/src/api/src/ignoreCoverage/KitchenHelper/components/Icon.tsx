// @ts-nocheck
import {Icon as NativeBaseIcon} from "native-base";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import React, {FunctionComponent} from "react";
import {InterfaceIconProps} from "native-base/lib/typescript/components/primitives/Icon/types";

export const Icon: FunctionComponent<InterfaceIconProps> = ({as, size, ...props}) => {

  let defaultAs = MaterialCommunityIcons;
  if(!!as){
    defaultAs = as;
  }

  let defaultSize = "lg";
  if(!!size){
    defaultSize = size;
  }

  function test(){
    for(let i=0; i<100; i++){
      console.log("test");
    }
  }

  function test2(){
    for(let i=0; i<100; i++){
      console.log("test2");
    }
  }


	return (
    <NativeBaseIcon size={defaultSize} as={defaultAs} {...props} />
  )
}
