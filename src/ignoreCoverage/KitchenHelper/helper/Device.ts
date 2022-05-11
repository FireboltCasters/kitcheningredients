// @ts-nocheck
import React from "react";
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';

export interface DeviceInformations{
  brand: any;
  os_name: any;
  os_version: any;
  device_type: any;
  font_scale: any;
  unique_id: any;
  app_version: any;
  is_emulator: boolean,
  has_notch: boolean,
  platform_api_level: any;
  display_width: any;
  display_height: any;
  display_scale: any;
}

export class Device{

  static async getInformations(): Promise<DeviceInformations>{
    let device_type = DeviceInfo.getDeviceType();
    if(device_type==="Handset"){
      device_type = "Phone";
    }

    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;
    const windowScale = Dimensions.get('screen').scale;

    let device = {
      brand: DeviceInfo.getBrand(),
      os_name: await DeviceInfo.getBaseOs() || DeviceInfo.getSystemName(),
      os_version: DeviceInfo.getSystemVersion(),
      device_type: device_type,
      font_scale: await DeviceInfo.getFontScale(),
      unique_id: DeviceInfo.getUniqueId(),
      app_version: DeviceInfo.getVersion(),
      is_emulator: await DeviceInfo.isEmulator(),
      has_notch: DeviceInfo.hasNotch(),
      platform_api_level: await DeviceInfo.getApiLevel(),
      display_width: windowWidth,
      display_height: windowHeight,
      display_scale: windowScale
    }

    return device;
  }

}
