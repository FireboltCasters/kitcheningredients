import React from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";

export const MyRoot: FunctionComponent = (props) => {
  console.log("MyRoot");

  return (
    <View>
      <Text>{"MyRoot"}</Text>
    </View>
  );
}
