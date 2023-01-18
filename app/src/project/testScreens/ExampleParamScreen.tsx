import React, {FunctionComponent} from "react";
import {Button, Text, View} from "native-base";
import {NavigatorHelper} from "../../api/src";

export const ExampleParamScreen: FunctionComponent = (props) => {

  const testParam = props?.route?.params?.testParam || 0;

  return (
    <View>
      <Text>{JSON.stringify(props, null, 2)}</Text>
      <Text>{testParam}</Text>
      <Button onPress={() => {
        NavigatorHelper.navigate(ExampleParamScreen, {testParam: parseInt(testParam)+1})
      }} ><Text>{"AddRoute test"}</Text></Button>
    </View>
  );
}
