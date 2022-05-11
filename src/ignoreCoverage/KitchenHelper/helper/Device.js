// @ts-nocheck
import React from "react";
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';

export class Device{

  static async getInformations(){
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
