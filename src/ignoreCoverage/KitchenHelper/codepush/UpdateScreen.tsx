// @ts-nocheck
import React, {FunctionComponent} from "react";
import {Text, TouchableOpacity, View} from "react-native";

interface AppState {
  receivedBytes: any;
  totalBytes: any;
  status: any;
  initialColorMode: any;
}
export const UpdateScreen: FunctionComponent<AppState> = (props) => {

  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
      <TouchableOpacity
        style={{
          backgroundColor: 'lightblue',
          borderRadius: 20,
          alignItems: 'center',
          margin: 20,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '600',
            color: 'black',
          }}
        >
          {'Status:\n'}
          {CodePushWrapper.getStatusMessage(this.state.status)}
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: 'black',
          }}
        >
          {'Download Progress:\n'}
          {`${this.state.receivedBytes} / ${this.state.totalBytes} Bytes`}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
