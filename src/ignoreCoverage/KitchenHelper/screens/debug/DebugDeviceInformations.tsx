// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Text, View} from "native-base";
import {Device, DeviceInformations} from "./../../helper/Device";

export const DebugDeviceInformations = (props) => {

  const [deviceinformations, setDeviceinformations] = useState<DeviceInformations | {}>({});

  async function load(){
    let informations = await Device.getInformations();
    setDeviceinformations(informations);
  }

	// corresponding componentDidMount
	useEffect(() => {
    load();
	}, [deviceinformations])

  function renderInformation(key){
    return <Text>{key+": "+deviceinformations[key]}</Text>
  }

  function renderInformations(){
    let rendered = [];
    let keys = Object.keys(deviceinformations);
    for(let key of keys){
      rendered.push(renderInformation(key))
    }
    return rendered;
  }

	return(
		<View style={{width: "100%"}}>
      {renderInformations()}
		</View>
	)
}
