// @ts-nocheck
import React from "react";
import {Dimensions, PixelRatio} from 'react-native';

export interface DeviceInformation{
  display_width: any,
  display_height: any,
  display_scale: any,
  display_pixelratio: any,
  display_fontscale: any,
}

export class Device{

  static async getInformations(): Promise<DeviceInformation>{
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;
    const windowScale = Dimensions.get('screen').scale;

    let device = {
      display_width: windowWidth,
      display_height: windowHeight,
      display_scale: windowScale,
      display_pixelratio: PixelRatio.get(),
      display_fontscale: PixelRatio.getFontScale()
    }

    return device;
  }

}
