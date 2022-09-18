import React, {useEffect} from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";
import {EmptyTemplate, Menu, MenuItem, useSynchedState} from "../api/src";
import {HiddenScreen} from "./HiddenScreen";
import {RequiredSynchedStates} from "../api/src/ignoreCoverage/KitchenHelper/synchedstate/RequiredSynchedStates";

export const MyLoading: FunctionComponent = (props) => {
  console.log("MyLoading");

  return (
    <View>
      <Text>{"MyLoading"}</Text>
    </View>
  );
}
