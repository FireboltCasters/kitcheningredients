import React, {FunctionComponent} from "react";
import {View} from "native-base";
import {RequiredSynchedStates, useSynchedJSONState} from "../api/src";

export const MyRoot: FunctionComponent = (props) => {

  const [navigationHistory, setNavigationHistory] = useSynchedJSONState(RequiredSynchedStates.navigationHistory)

  return (
    <View>
    </View>
  );
}
