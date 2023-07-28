import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {ThemedMarkdown} from "../../api/src";

export const ExampleHomeComponent: FunctionComponent = (props) => {

  let markdownTextExample = `
This library is designed to create your own app for web, android and ios.It is based on native-base and is connectable to a Directus backend.
`;


  return (
    <View>
      <ThemedMarkdown>
        {markdownTextExample}
      </ThemedMarkdown>
    </View>
  );
}
