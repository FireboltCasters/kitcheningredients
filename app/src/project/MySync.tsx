import React, {useEffect, useState} from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";
import {EmptyTemplate, Menu, MenuItem, useSynchedState} from "../api/src";
import {HiddenScreen} from "./HiddenScreen";
import {ConfigHolder} from "../api/src/ignoreCoverage/KitchenHelper/ConfigHolder";

export const MySync: FunctionComponent = (props) => {
  console.log("MySynch");

  const user = ConfigHolder.instance.getUser()
  console.log(user)

  async function load(){
    if(!!user){
      Menu.registerRoute(HiddenScreen, EmptyTemplate, "HiddenScreen", "hidden", null, true);
      Menu.registerCommonMenu(new MenuItem("HiddenScreen", "HiddenScreen", HiddenScreen))
    }
    await ConfigHolder.instance.setSyncFinished(true)
  }

  useEffect(() => {
    load()
  }, [props]);

  return (
    <View>
      <Text>{"MySynching"}</Text>
    </View>
  );
}
