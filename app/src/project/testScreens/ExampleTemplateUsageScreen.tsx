import React, {FunctionComponent} from "react";
import {Divider, Spacer, Text, View} from "native-base";
import TextGenerator from "../../api/src/ignoreCoverage/KitchenHelper/helper/TextGenerator";

export const ExampleTemplateUsageScreen: FunctionComponent = (props) => {

  const longText = TextGenerator.generateTextLong();

  return (
    <View>
        <Text>{"Long text will follow to show the different styles of the templates:"}</Text>
        <Text>{longText}</Text>
        <Divider/>
    </View>
  );
}
