import React, {FunctionComponent} from "react";
import {View, Text, Button, Skeleton} from "native-base";
import {DirectusImage, SynchedState} from "../../api/src";
import {ProjectLogo} from "../../api/src/ignoreCoverage/KitchenHelper/project/ProjectLogo";

export const ExampleHeavySkeleton: FunctionComponent = (props) => {

  return (
    <View>
      <Skeleton height={"100%"} width={"100%"}/>
    </View>
  );
}
