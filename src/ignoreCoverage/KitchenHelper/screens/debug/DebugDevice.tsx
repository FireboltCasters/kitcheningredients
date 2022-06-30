// @ts-nocheck
import React, {useEffect, useRef, useState} from "react";
import {Button, Input, Text, View} from "native-base";
import {Device} from "./../../helper/Device";
import {DeviceInformation} from "../../helper/Device";

export const DebugDevice = (props) => {

  const [deviceinformations, setDeviceinformations] = useState<DeviceInformation | {}>({});

	async function load(){
    setDeviceinformations(await Device.getInformations());
	}

	// corresponding componentDidMount
	useEffect(() => {
    load();
	}, [])

  function renderDeviceInformation(key){
	  return <Text>{key+": "+deviceinformations[key]}</Text>
  }

  function renderDeviceInformations(){
    let rendered = [];
    let keys = Object.keys(deviceinformations);
    for(let key of keys){
      rendered.push(renderDeviceInformation(key));
    }
    return rendered
  }

	return(
		<>
      {renderDeviceInformations()}
		</>
	)
}
