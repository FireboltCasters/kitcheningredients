import React from "react";
import {Button, Text, View} from "native-base";
import {FunctionComponent} from "react";
import {EmptyTemplate, Menu, MenuItem, useSynchedState} from "../api/src";
import {RequiredSynchedStates} from "../api/src/ignoreCoverage/KitchenHelper/synchedstate/RequiredSynchedStates";

export const HiddenScreen: FunctionComponent = (props) => {

  return (
    <View>
      <Text>HiddenScreen</Text>
    </View>
  );
}
