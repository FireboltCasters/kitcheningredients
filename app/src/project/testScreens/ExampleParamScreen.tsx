import React, {FunctionComponent, useState} from "react";
import {Button, Text, View} from "native-base";
import {Navigation, NavigatorHelper} from "../../api/src";
import {TouchableOpacity} from "react-native";

export const ExampleParamScreen: FunctionComponent = (props) => {

  const [counter, setCounter] = useState(0);

  const testParam = props?.route?.params?.testParam || 0;

  return (
    <View>
      <Text>{JSON.stringify(props, null, 2)}</Text>
      <Button onPress={() => {setCounter(counter+1)}}>
        {"State Counter: "+counter}
      </Button>
      <Button onPress={() => {
        Navigation.navigateTo("ExampleParamScreen", {testParam: parseInt(testParam)+1})
      }} >
        {"Increase Param: "+testParam}
      </Button>
      <TouchableOpacity onPress={() => {
        Navigation.navigateTo("Subpath")
      }}>
        <Text>Go to Subpath</Text>
      </TouchableOpacity>
    </View>
  );
}
