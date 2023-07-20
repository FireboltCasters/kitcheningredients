import React, {FunctionComponent, useEffect, useState} from "react";
import {Text, View} from "native-base";

export const ExampleHeavyScreen: FunctionComponent = (props) => {

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

  /**
  let rendered = [];

  let newRendered = [];
  for(let i = 0; i < 5000; i++) {
    newRendered.push(
      <Text key={i}>{i}</Text>
    )
  }
  rendered = newRendered;
*/

  return (
    <View key={""+rendered.length}>
      <Text>{"ExampleHeavyScreen: "+rendered.length}</Text>
      {rendered}
    </View>
  );
}
