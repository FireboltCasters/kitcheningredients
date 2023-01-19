import React, {useEffect, useState} from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";
import {BaseTemplate, EmptyTemplate, Menu, MenuItem, useSynchedState, Navigation} from "../api/src";
import {HiddenScreen} from "./testScreens/HiddenScreen";
import {ConfigHolder} from "../api/src/ignoreCoverage/KitchenHelper/ConfigHolder";
import {ExampleImageScreen} from "./testScreens/ExampleImageScreen";
import {ExampleMarkdownScreen} from "./testScreens/ExampleMarkdownScreen";
import {ExampleIconScreen} from "./testScreens/ExampleIconScreen";
import {ExampleParamScreen} from "./testScreens/ExampleParamScreen";
import {ExampleRoutesInformationsScreen} from "./testScreens/ExampleRoutesInformationsScreen";

export const MySync: FunctionComponent = (props) => {
  console.log("MySynch");

  const user = ConfigHolder.instance.getUser()
  console.log(user)

  async function load(){
    Navigation.routeRegister({
      component: ExampleRoutesInformationsScreen,
    })
    Navigation.routeRegister({
      component: ExampleParamScreen,
      params: "/:testParam",
    })

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
