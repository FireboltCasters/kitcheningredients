// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Card, Divider, Input, Text, View, VStack} from "native-base";
import {DebugDeviceInformations} from "./DebugDeviceInformations";

export const Debug = (props) => {

	// corresponding componentDidMount
	useEffect(() => {

	}, [props.route.params])

  function renderCard(title, content){
	  return(
      <Box border="1" borderRadius="md">
        <VStack space="4" divider={<Divider />}>
          <Box px="4" pt="4">
            <Text>{title}</Text>
          </Box>
          <Box px="4">
            {content}
          </Box>
        </VStack>
      </Box>
    )
  }

	return(
		<View style={{width: "100%"}}>
      {renderCard("Device Informations", <DebugDeviceInformations />)}
		</View>
	)
}
