import React, {FunctionComponent} from "react";
import {View, Text, Button} from "native-base";
import {DirectusImage, Navigation, SynchedState, NavigatorHelper} from "../../api/src";
import {ExampleNavigationGoBackSub} from "./ExampleNavigationGoBackSub";

export const ExampleNavigationGoBack: FunctionComponent = (props) => {

  const [history, setHistory] = Navigation.useNavigationHistory();
  const rawHistory = NavigatorHelper.getHistory();

  return (
    <View>
      <Text>{"Normal image"}</Text>
      <Button onPress={() => {
        Navigation.navigateTo(ExampleNavigationGoBackSub);
      }}>
        <Text>{"Go to sub"}</Text>
      </Button>
      <Text>{JSON.stringify(history, null, 2)}</Text>
      <Text>{JSON.stringify(rawHistory, null, 2)}</Text>
    </View>
  );
}
