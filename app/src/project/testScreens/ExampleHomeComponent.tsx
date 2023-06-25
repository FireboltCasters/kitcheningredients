import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {ThemedMarkdown} from "../../api/src";

export const ExampleHomeComponent: FunctionComponent = (props) => {

  let markdownTextExample = `
# Welcome to kitcheningredients

This library is designed to create your own app for web, android and ios. It is based on native-base and is connectable to a Directus backend.

More information can be found soon.
`;


  return (
    <View>
      <ThemedMarkdown>
        {markdownTextExample}
      </ThemedMarkdown>
    </View>
  );
}
