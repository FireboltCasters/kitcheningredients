import React, {useEffect, useState} from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";
import {BaseTemplate, EmptyTemplate, Menu, MenuItem, useSynchedState} from "../api/src";
import {HiddenScreen} from "./testScreens/HiddenScreen";
import {ConfigHolder} from "../api/src/ignoreCoverage/KitchenHelper/ConfigHolder";
import {ExampleImageScreen} from "./testScreens/ExampleImageScreen";
import {ExampleMarkdownScreen} from "./testScreens/ExampleMarkdownScreen";
import {ExampleIconScreen} from "./testScreens/ExampleIconScreen";
import {ExampleParamScreen} from "./testScreens/ExampleParamScreen";

export const MySync: FunctionComponent = (props) => {
  console.log("MySynch");

  const user = ConfigHolder.instance.getUser()
  console.log(user)

  async function load(){
    if(!!user){
      Menu.registerRoute(HiddenScreen, EmptyTemplate, "HiddenScreen", "hidden", null, true);
      Menu.registerCommonMenu(new MenuItem("HiddenScreen", "HiddenScreen", HiddenScreen))
    }

    Menu.registerRoute(ExampleImageScreen, EmptyTemplate, "ExampleImageScreen", "ExampleImageScreen", null, true);
    Menu.registerCommonMenu(new MenuItem("ExampleImageScreen", "ExampleImageScreen", ExampleImageScreen))

    Menu.registerRoute(ExampleIconScreen, BaseTemplate, "ExampleIconScreen", "ExampleIconScreen", null, true);
    Menu.registerCommonMenu(new MenuItem("ExampleIconScreen", "ExampleIconScreen", ExampleIconScreen))

    Menu.registerRoute(ExampleParamScreen, BaseTemplate, "ExampleParamScreen", "ExampleParamScreen", "/:testParam", true);
    Menu.registerCommonMenu(new MenuItem("ExampleParamScreen", "ExampleParamScreen", ExampleParamScreen))


    Menu.registerRoute(ExampleMarkdownScreen, BaseTemplate, "ExampleMarkdownScreen", "ExampleMarkdownScreen", null, true);
    Menu.registerCommonMenu(new MenuItem("ExampleMarkdownScreen", "ExampleMarkdownScreen", ExampleMarkdownScreen))


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
