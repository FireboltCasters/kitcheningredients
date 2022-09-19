import React, {useEffect, useState} from "react";
import {Text, View} from "native-base";
import {FunctionComponent} from "react";
import {EmptyTemplate, Menu, MenuItem, RequiredSynchedStates, useSynchedJSONState, useSynchedState} from "../api/src";

export const MyRoot: FunctionComponent = (props) => {

  const [navigationHistory, setNavigationHistory] = useSynchedJSONState(RequiredSynchedStates.navigationHistory)

  return (
    <View>
      <Text>{"History: "+JSON.stringify(navigationHistory)}</Text>
    </View>
  );
}
