import React, {FunctionComponent} from "react";
import {View, Text, Button} from "native-base";
import {DirectusImage, Navigation, NavigatorHelper, SynchedState} from "../../api/src";
import {ProjectLogo} from "../../api/src/ignoreCoverage/KitchenHelper/project/ProjectLogo";
import {ExampleNavigationGoBack} from "./ExampleNavigationGoBack";

export const ExampleNavigationGoBackSub: FunctionComponent = (props) => {

  console.log("ExampleNavigationGoBackSub: "+new Date().toISOString());

  const [history, setHistory] = Navigation.useNavigationHistory();
  const rawHistory = NavigatorHelper.getHistory();

  return (
    <View>
      <Text>{"Normal image"}</Text>
      <Button onPress={() => {
        Navigation.navigateTo(ExampleNavigationGoBack);
      }}>
        <Text>{"Go directly to ExampleNavigationGoBack"}</Text>
      </Button>
      <Button onPress={() => {
        Navigation.navigateBack();
      }}>
        <Text>{"Go back"}</Text>
      </Button>
      <Text>{JSON.stringify(history, null, 2)}</Text>
      <Text>{JSON.stringify(rawHistory, null, 2)}</Text>
    </View>
  );
}
