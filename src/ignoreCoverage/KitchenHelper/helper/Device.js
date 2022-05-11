// @ts-nocheck
import React from "react";
import DeviceInfo from 'react-native-device-info';

export class Device{

  static async getInformations(){
    let device = {
      brand: null,
      os_name: null,
      os_version: null,
      device_type: null,
      font_scale: await DeviceInfo.getFontScale(),
      unique_id: null,
      app_version: null,
      is_emulator: null,
      has_notch: null,
      platform_api_level: null,
      display_width: null,
      display_height: null,
    }

    return device;
  }

}
