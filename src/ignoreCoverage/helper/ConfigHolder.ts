// @ts-nocheck

import type {PluginInterface} from "../PluginInterface";

export class ConfigHolder{

  static plugin : PluginInterface;
  static test = {"a": " ConfigHolderTest"};

  static setTest(value){
    console.log("setTest");
    console.log(value);
    ConfigHolder.test = value;
  }

}
