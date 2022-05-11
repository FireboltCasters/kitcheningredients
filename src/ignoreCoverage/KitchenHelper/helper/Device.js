// @ts-nocheck
import React from "react";
import { Dimensions } from 'react-native';

export class Device{

  static async getInformations(){
    const windowWidth = Dimensions.get('screen').width;
    const windowHeight = Dimensions.get('screen').height;
    const windowScale = Dimensions.get('screen').scale;

    let device = {
      display_width: windowWidth,
      display_height: windowHeight,
      display_scale: windowScale
    }

    return device;
  }

}
