import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Text, View} from "native-base";
import {useSynchedJSONState} from "../../api/src";
import {StorageKeys} from "../helper/StorageKeys";

export class ExampleHeavyScreenClass extends React.Component {



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
