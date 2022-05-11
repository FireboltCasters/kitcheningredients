// @ts-nocheck
import React from "react";
import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export interface DeviceInformation{
  display_width: any,
  display_height: any,
  display_scale: any,
  device_type: any
}

export class Device{

  static async getInformations(): Promise<DeviceInformation>{
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;
    const windowScale = Dimensions.get('screen').scale;

    let device_type = DeviceInfo.getDeviceType() || "Web";
    if(device_type==="Handset"){
      device_type="Phone";
    }

    let device = {
      display_width: windowWidth,
      display_height: windowHeight,
      display_scale: windowScale,
      device_type: device_type,
    }

    return device;
  }

}
