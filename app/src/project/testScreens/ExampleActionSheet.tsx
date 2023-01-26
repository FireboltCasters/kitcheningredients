import React, {FunctionComponent} from "react";
import {Button, Divider, Input, Text, View} from "native-base";
import {MyActionsheet} from "../../api/src";

export const ExampleActionSheet: FunctionComponent = (props) => {

  const actionsheet = MyActionsheet.useActionsheet();

  function showDefaultAction(){
    actionsheet.show({
      title: "Default ActionSheet",
    });
  }

  function renderActionInput(){
    actionsheet.show({
      title: "Action Sheet with input",
      renderCustomContent: (onCloseModal) => {
        return (
          <View style={{width: "100%", backgroundColor: "red"}}>
            <Text>{"On mobile this should swipe up, so that the keyboard does not hide the input"}</Text>
            <Input placeholder={"Test"} />
            <Text>{"Placeholder Text just to increase the size. Below is another input"}</Text>
            <View style={{height: 800, width: 100, backgroundColor: "blue"}} />
            <Input placeholder={"Bottom Input"} />
          </View>
        )
      }
    });
  }

  return (
    <View style={{width: "100%", flex: 1, flexDirection: "row"}}>
      <View  style={{width: "100%", flex: 1}}>
        <Button onPress={showDefaultAction}>
          <Text>{"Show default Action"}</Text>
        </Button>
        <Divider />
        <Button onPress={renderActionInput}>
          <Text>{"Show Action with Input"}</Text>
        </Button>
      </View>
    </View>
  );
}
