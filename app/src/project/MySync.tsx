import React, {FunctionComponent, useEffect} from "react";
import {Text, View} from "native-base";
import {BaseTemplate, Navigation} from "../api/src";
import {ConfigHolder} from "../api/src/ignoreCoverage/KitchenHelper/ConfigHolder";
import {ExampleParamScreen} from "./testScreens/ExampleParamScreen";
import {ExampleRoutesInformationsScreen} from "./testScreens/ExampleRoutesInformationsScreen";
import {ExampleTemplateUsageScreen} from "./testScreens/ExampleTemplateUsageScreen";

export const MySync: FunctionComponent = (props) => {
  console.log("MySynch");

  const user = ConfigHolder.instance.getUser()
  console.log(user)

  async function load(){

    let route = Navigation.routeRegister({
      component: ExampleRoutesInformationsScreen,
      template: BaseTemplate,
    })
    Navigation.menuRegister({
      route: route,
      name: "ExampleRoutesInformationsScreen",
      icon: "home",
    })


    Navigation.routeRegister({
      component: ExampleParamScreen,
      template: BaseTemplate,
      params: {
        testParam: 0
      },
    })
    Navigation.routeRegister({
      component: ExampleTemplateUsageScreen,
      template: BaseTemplate,
    });

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
