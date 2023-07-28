import React, {FunctionComponent} from "react";
import {Button, Text, View} from "native-base";
import {ConfigHolder, ThemedMarkdown} from "../../api/src";

export const ExampleChangeBackendUrl: FunctionComponent = (props) => {

  let markdownTextExample = `
Change the BackendUrl to mock the app from a different server. Usefull for testing other services or for a beta server.
`;

  function renderChangeBackendButton(url){
    return(
      <Button onPress={() => {
        ConfigHolder.instance.setBackendUrlAndReload(url)
      }}>
        <Text>{url}</Text>
      </Button>
    )
  }

  return (
    <View>
      <ThemedMarkdown>
        {markdownTextExample}
      </ThemedMarkdown>
      {renderChangeBackendButton("https://studi-futter.rocket-meals.de/backend/api")}
      {renderChangeBackendButton("https://rocket-meals.de/demo/api")}
    </View>
  );
}
