import React, {FunctionComponent, useEffect, useState} from "react";
import {Button, Text, View} from "native-base";
import {useSynchedJSONState} from "../../api/src";
import {StorageKeys} from "../helper/StorageKeys";

export const ExampleHeavyScreen: FunctionComponent = (props) => {

  const [test, setTest] = useSynchedJSONState(StorageKeys.TEST_STORAGE_KEY)

  const [rendered, setRendered] = useState([])


  useEffect(() => {
    setTimeout(() => {
      let newRendered = [];
      for(let i = 0; i < 5000; i++) {

        newRendered.push(
          <Text key={i}>{i}</Text>
        )
      }
        setRendered(newRendered);
    }, 1000)
    },  [props]);


  return (
    <View key={""+rendered.length}>
      <Text>{"ExampleHeavyScreen"}</Text>
      {rendered}
    </View>
  );
}
