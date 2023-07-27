import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {ThemedMarkdown} from "../../api/src";

export const ExampleHomeComponent: FunctionComponent = (props) => {

  let markdownTextExample = `
# Welcome to kitcheningredients

This library is designed to create your own app for web, android and ios.It is based on native-base and is connectable to a Directus backend.

1<br/>
2<br>
3</br>
4\n
5<p/>
6<p>
7</p>
New Line?
`;


  return (
    <View>
      <ThemedMarkdown>
        {markdownTextExample}
      </ThemedMarkdown>
    </View>
  );
}
