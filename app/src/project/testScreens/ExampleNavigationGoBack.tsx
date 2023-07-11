import React, {FunctionComponent} from "react";
import {Button, Text, View} from "native-base";
import {Navigation, NavigatorHelper} from "../../api/src";
import {ExampleNavigationGoBackSub} from "./ExampleNavigationGoBackSub";
import {DrawerActions} from "@react-navigation/native";

export const ExampleNavigationGoBack: FunctionComponent = (props) => {

  console.log("ExampleNavigationGoBack: "+new Date().toISOString());

  const [history, setHistory] = Navigation.useNavigationHistory();
  const rawHistory = NavigatorHelper.getHistory();

  return (
    <View>
      <Text>{"Normal image"}</Text>
      <Button onPress={() => {
        Navigation.navigateTo(ExampleNavigationGoBackSub, {showbackbutton: true});
      }}>
        <Text>{"Go to sub"}</Text>
      </Button>
      <Text>{JSON.stringify(history, null, 2)}</Text>
      <Text>{JSON.stringify(rawHistory, null, 2)}</Text>
    </View>
  );
}
