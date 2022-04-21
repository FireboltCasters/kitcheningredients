// @ts-nocheck

import type {PluginInterface} from "../PluginInterface";
import {DefaultStorage} from "./storage/DefaultStorage";

export class ConfigHolder{

  static storage: DefaultStorage = null;
  static instance: any = null;
  static plugin: PluginInterface = null;
  static nativebaseConfig = null;
  static styleConfig = null;
  static config = null;
  static currentpackageJson = null;
  static currentpackageJsonLock = null;
  static thirdpartyLicense = null;
  static AppConfig = null;

}