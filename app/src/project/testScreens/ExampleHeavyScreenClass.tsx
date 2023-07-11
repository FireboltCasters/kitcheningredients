import React from "react";
import {Button, Divider, Input, Text, View} from "native-base";

export class ExampleHeavyScreenClass {

  render() {
    let rendered = [];

    let newRendered = [];
    for(let i = 0; i < 5000; i++) {
      newRendered.push(
        <Text key={i}>{i}</Text>
      )
    }
    rendered = newRendered;

    return (
      <View>
        <Text>{"ExampleHeavyScreenClass: "}</Text>
        {rendered}
      </View>
    );
  }

}
